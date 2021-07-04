const router = require('express').Router();
const { getAttendeesApproved, getAllAttendess, setApproval , sendEmailToApprovedAttendee  , countApprovedAttendees , deleteOneAttendee } = require('../../controllers/attendeeController');
const { getAllWorkShopConductoresNotApproved , setWorkShopConductorAsApproved , sendEmailToApprovedConductor , countApprovedWorkShops , deleteOneWorkShopConductor} = require('../../controllers/workShopConductorController');
const { getResearchPaperPublisherApproved , setResearchPaperAsApproved , sendEmailToApprovedResearchPapers , countApprovedResearchPapers , deleteOnePublisher} = require('../../controllers/researchPaperPublisher');
const { getAllContacts } = require('../../controllers/contactUsController');
const { userAuth, checkRole } = require('../../controllers/Auth.controller');



//------------------------------------------------- attendee routes ---------------------------------------------------------------------------
router.get('/get-attendees-is-approved' , userAuth, checkRole(['admin', 'reviewer']), async(req, res) => {
    await getAttendeesApproved(req.body, res);
});

router.get('/send-email-to-approved-attendee/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await sendEmailToApprovedAttendee(req, res);
});

router.get('/get-approved-attendee-count', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await countApprovedAttendees(req,res);
});

router.get('/get-attendees-not-approved', userAuth , checkRole(['admin', 'reviewer']), async(req,res) => {
    await getAllAttendess(req,res);
});

router.delete('/delete-attendee/:id', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await deleteOneAttendee(req,res);
});

router.put('/set-approval/:id', userAuth , checkRole(['admin', 'reviewer']), async(req,res) => {
    await setApproval(req,res);
});


//-------------------------------------------------end attendee routes ------------------------------------------------------------------------
//------------------------------------------------work shop conductors ------------------------------------------------------------------------

router.get('/get-all-not-approved-work-shop-conductors' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await getAllWorkShopConductoresNotApproved(req.body, res);
});

router.get('/send-email-to-approved-work-shop/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await sendEmailToApprovedConductor(req, res);
});

router.put('/set-work-shop-conductor-approved/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await setWorkShopConductorAsApproved(req, res);
});

router.delete('/delete-work-shops/:id', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await deleteOneWorkShopConductor(req,res);
});

router.get('/get-approved-work-shops-count', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await countApprovedWorkShops(req,res);
});

//---------------------------------------------end work shop conductors------------------------------------------------------------------------
//---------------------------------------------research paper routes --------------------------------------------------------------------------

router.get('/send-email-to-approved-researchpapers/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await sendEmailToApprovedResearchPapers(req, res);
});

router.get('/get-approved-research-paper-publishers/' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await getResearchPaperPublisherApproved(req.body, res);
});

router.put('/set-research-paper-approved/:id' , userAuth , checkRole(['admin', 'reviewer']), async(req, res) => {
    await setResearchPaperAsApproved(req, res);
});

router.get('/get-approved-research-count', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await countApprovedResearchPapers(req,res);
});

router.delete('/delete-publiser/:id', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await deleteOnePublisher(req,res);
});


//----------------------------------------------------contact us------------------------------------------------------------------------------

router.get('/get-all-contacts', userAuth , checkRole(['admin' , 'reviewer']), async(req,res) => {
    await getAllContacts(req,res);
});
















module.exports = router;