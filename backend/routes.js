
const express = require('express');
const multer = require('multer');
const { uploadFiles, sendDataToDb, getPostsFromDb } = require('./controller.js');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
    try {
        const files = await uploadFiles(req.files, res)
        await sendDataToDb(req, res, files);
    }
    catch (e) {
        res.status(500).json({ success: false, error: 'Internal Server Error', e });


    }
});

router.get('/', async (req, res) => {

    try {
        const posts = await getPostsFromDb();
        res.json(posts);
    }
    catch (e) {
        console.log('error getting data from db', e);
    }

})


module.exports = router;