
const router = require('express').Router();
const { getAttendeesApproved, getAllAttendess, setApproval } = require('../../controllers/attendeeController');
const { getAllWorkShopConductoresApproved } = require('../../controllers/workShopConductorController');
const { getResearchPaperPublisherApproved } = require('../../controllers/researchPaperPublisher');
const { getAllContacts } = require('../../controllers/contactUsController');

const { userAuth, checkRole } = require('../../controllers/Auth.controller');
const { updateRole, updateUserDetails, deleteUser, findUserByRole, findUser, getallUsers, sendMailUser } = require('../../controllers/Edit_User/edit_user');
const { createConferenceDetails, getConferenceDetails, updateAllDetails, updateStatus, removeConferenceDetail, getConferenceDetailByID, sendMailConference } = require('../../controllers/conference-detail');
const { addTemplate, getAllTemplate, getOneTemplate, updateTemplate, deleteTemplate } = require('../../controllers/Template/templatecontroller');
const { addKeynote, getAllKeynotes, getApprovedKeynotes, getPendingKeynotes, updateKeynote, deleteKeynote, getKeynoteByID,  sendEmailToAdmin, countKeynotes } = require('../../controllers/keynoteController');


//editor protected route
router.get(
  "/editor-protected",
  userAuth,
  checkRole(["editor"]),
  async (req, res) => {
    return res.send("Hello Editor");
  }
);

//admin protected route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.send("Hello Admin");
  }
);

//reviewer protected route
router.get(
  "/reviewer-protected",
  userAuth,
  checkRole(["reviewer"]),
  async (req, res) => {
    return res.send("Hello Reviewer");
  }
);

//admin and reviewer protected route
router.get(
  "/admin&editor-protected",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    return res.send("Hello Admin and Editor");
  }
);

//admin and reviewer protected route
router.get(
  "/admin&reviewer-protected",
  userAuth,
  checkRole(["admin", "reviewer"]),
  async (req, res) => {
    return res.send("Hello Admin and Reviewer");
  }
);

//admin and reviewer and editor protected route
router.get(
  "/admin&reviewer&editor-protected",
  userAuth,
  checkRole(["admin", "reviewer", "editor"]),
  async (req, res) => {
    return res.send("Hello Admin and Reviewer and Editor");
  }
);



//---------------------------------------------End check routes-----------------------------------------

//---------------------------------------------Start admin role routes----------------------------------

//update role type admin
router.put('/role_manage/update/role/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await updateRole(req, req.params.id, res);
});

//update details of them

router.put('/role_manage/update/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await updateUserDetails(req.body, req.params.id, res);
  }
);

//update role type admin

router.delete('/role_manage/delete/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await deleteUser(req.params.id, res);
});

router.get('/role_manage/getRole/:name' , userAuth , checkRole(['admin']) , async(req, res) => {
    await findUserByRole(req.params.name, res);
});

router.get('/role_manage/finduser/:id' , userAuth, checkRole(['admin']) , async(req, res) => {
    await findUser(req.params.id, res);
});

router.get('/role_manage/getAll' , userAuth, checkRole(['admin']) , async(req, res) => {
    await getallUsers(req, res);
  }
);

router.post('/role_manage/send-email' , userAuth, checkRole(['admin']) , async(req, res) => {
    await sendMailUser(req, res);
});

//--------------------------------------End role manage routes-------------------------------------------

//--------------------------------------Start atendee routes---------------------------------------------

router.get(
  "/get-attendees-is-approved",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getAttendeesApproved(req.body, res);
  }
);

router.get(
  "/get-all-approved-work-shop-conductors",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getAllWorkShopConductoresApproved(req.body, res);
  }
);

// router.get('/get-approved-research-paper-publishers' , userAuth , checkRole(['admin', 'editor']), async(req, res) => {
//     await getResearchPaperPublisherApproved(req.body, res);
// });

router.get(
  "/get-all-contacts",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await getAllContacts(req, res);
  }
);

router.get(
  "/get-attendees-not-approved",
  userAuth,
  checkRole(["admin", "reviewer"]),
  async (req, res) => {
    await getAllAttendess(req, res);
  }
);

router.put(
  "/set-approval/:id",
  userAuth,
  checkRole(["admin", "reviewer"]),
  async (req, res) => {
    await setApproval(req, res);
  }
);

//------------------------------------------------End atendee routes----------------------------------------------

//------------------------------------------------Start conference-details routes----------------------------------

router.post(
  "/conference",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await createConferenceDetails(req, res);
  }
);

router.get(
  "/conference",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getConferenceDetails(req, res);
  }
);

router.put(
  "/conference/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await updateAllDetails(req, req.params.id, res);
  }
);

router.put(
  "/conference/update-status/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await updateStatus(req, req.params.id, res);
  }
);

router.delete(
  "/conference/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await removeConferenceDetail(req, res);
  }
);

router.get(
  "/conference/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getConferenceDetailByID(req, res);
  }
);

router.post('/conference/send-email', userAuth , checkRole(['admin', 'editor']), async(req,res) => {
    await sendMailConference(req, res);
});

//--------------------------------------------End conference-details routes----------------------------------------

//-------------------------------------Start template routes------------------------------------------------------

//template protected routes
router.post(
  "/template/create-template",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await addTemplate(req, res);
  }
);

router.get(
  "/template/templateAllBack",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getAllTemplate(req, res);
  }
);

router.get(
  "/template/findtemplate/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getOneTemplate(req, res);
  }
);

router.put(
  "/template/update/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await updateTemplate(req, req.params.id, res);
  }
);

router.delete(
  "/template/delete/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await deleteTemplate(req, res);
  }
);

//---------------------------------------End template routes-----------------------------------------------------

//---------------------------------------Start keynote routes----------------------------------------------------

router.post(
  "/keynote/add-keynote",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await addKeynote(req, res);
  }
);

router.get(
  "/keynote/get-keynotes",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getAllKeynotes(req, res);
  }
);

router.get(
  "/keynote/get-approved-keynotes",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getApprovedKeynotes(req, res);
  }
);

router.get(
  "/keynote/get-pending-keynotes",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getPendingKeynotes(req, res);
  }
);

router.put(
  "/keynote/update-keynote/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await updateKeynote(req, res);
  }
);

router.put(
  "/keynote/approve-keynote/:id",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await updateKeynote(req, res);
  }
);

router.delete(
  "/keynote/delete-keynote/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await deleteKeynote(req, res);
  }
);

router.get(
  "/keynote/get-keynotes/:id",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await getKeynoteByID(req, res);
  }
);

router.post(

  "/keynote/send-mail",
  userAuth,
  checkRole(["admin", "editor"]),
  async (req, res) => {
    await sendEmailToAdmin(req, res);
  }
);

router.get(

    "/keynote/count-keynotes",
    userAuth,
    checkRole(["admin", "editor"]),
    async (req, res) => {
      await countKeynotes(req, res);
    }
  );

//------------------------------------------End keynote routes---------------------------------------------------

module.exports = router;
