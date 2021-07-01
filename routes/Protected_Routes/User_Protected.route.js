const router = require('express').Router();
const { getAttendeesApproved } = require('../../controllers/attendeeController');
const { getAllWorkShopConductoresApproved } = require('../../controllers/workShopConductorController');
const { getResearchPaperPublisherApproved } = require('../../controllers/researchPaperPublisher');
const { getAllContacts } = require('../../controllers/contactUsController');

const { userAuth, checkRole } = require('../../controllers/Auth.controller');

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

router.get('/get-attendees-is-approved' , userAuth, checkRole(['admin', 'editor']), async(req, res) => {
    await getAttendeesApproved(req.body, res);
});

router.get('/get-all-approved-work-shop-conductors' , userAuth , checkRole(['admin', 'editor']), async(req, res) => {
    await getAllWorkShopConductoresApproved(req.body, res);
});

// router.get('/get-approved-research-paper-publishers' , userAuth , checkRole(['admin', 'editor']), async(req, res) => {
//     await getResearchPaperPublisherApproved(req.body, res);
// });

router.get('/get-all-contacts', userAuth , checkRole(['admin']), async(req,res) => {
    await getAllContacts(req,res);
});

module.exports = router;