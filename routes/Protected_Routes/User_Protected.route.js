const router = require('express').Router();
const { getAttendeesApproved, getAllAttendess, setApproval } = require('../../controllers/attendeeController');
const { getAllWorkShopConductoresNotApproved , setWorkShopConductorAsApproved } = require('../../controllers/workShopConductorController');
const { getResearchPaperPublisherApproved } = require('../../controllers/researchPaperPublisher');
const { getAllContacts } = require('../../controllers/contactUsController');

const { userAuth, checkRole } = require('../../controllers/Auth.controller');
const { updateRole, updateUserDetails, deleteUser, findUserByRole, findUser, getallUsers } = require('../../controllers/Edit_User/edit_user');

//editor protected route
router.get('/editor-protected', userAuth, checkRole(['editor']), async(req, res) => {
    return res.send("Hello Editor");
});

//admin protected route
router.get('/admin-protected', userAuth, checkRole(['admin']), async(req, res) => {
    return res.send("Hello Admin");
});

//reviewer protected route
router.get('/reviewer-protected', userAuth, checkRole(['reviewer']), async(req, res) => {
    return res.send("Hello Reviewer");
});

//admin and reviewer protected route
router.get('/admin&editor-protected', userAuth, checkRole(['admin', 'editor']), async(req, res) => {
    return res.send("Hello Admin and Editor");
});

//admin and reviewer protected route
router.get('/admin&reviewer-protected', userAuth, checkRole(['admin', 'reviewer']), async(req, res) => {
    return res.send("Hello Admin and Reviewer");
});

//admin and reviewer and editor protected route
router.get('/admin&reviewer&editor-protected', userAuth, checkRole(['admin', 'reviewer', 'editor']), async(req, res) => {
    return res.send("Hello Admin and Reviewer and Editor");
});


//update role type admin
router.put('/update/role/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await updateRole(req, req.params.id, res);
});

//update details of them
router.put('/update/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await updateUserDetails(req.body, req.params.id, res);
});

//update role type admin
router.delete('/delete/:id' , userAuth , checkRole(['admin']) , async(req, res) => {
    await deleteUser(req.params.id, res);
});

router.get('/getRole/:name' , userAuth , checkRole(['admin']) , async(req, res) => {
    await findUserByRole(req.params.name, res);
});

router.get('/finduser/:id' , userAuth, checkRole(['admin']) , async(req, res) => {
    await findUser(req.params.id, res);
});

router.get('/getAll' , userAuth, checkRole(['admin']) , async(req, res) => {
    await getallUsers(req, res);
});

router.get('/get-attendees-is-approved' , userAuth, checkRole(['admin', 'editor']), async(req, res) => {
    await getAttendeesApproved(req.body, res);
});

router.get('/get-all-not-approved-work-shop-conductors' , userAuth , checkRole(['admin', 'editor']), async(req, res) => {
    await getAllWorkShopConductoresNotApproved(req.body, res);
});

router.put('/set-work-shop-conductor-approved/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await setWorkShopConductorAsApproved(req, res);
});

router.get('/get-approved-research-paper-publishers' , userAuth , checkRole(['admin', 'editor']), async(req, res) => {
    await getResearchPaperPublisherApproved(req.body, res);
});

router.get('/get-all-contacts', userAuth , checkRole(['admin']), async(req,res) => {
    await getAllContacts(req,res);
});

router.get('/get-attendees-not-approved', userAuth , checkRole(['admin', 'reviewer']), async(req,res) => {
    await getAllAttendess(req,res);
});

router.put('/set-approval/:id', userAuth , checkRole(['admin', 'reviewer']), async(req,res) => {
    await setApproval(req,res);
});


module.exports = router;