const express = require('express')
const fs = require('fs');

const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken')
const secretKey = 'foz-engineer-secret';
const About = require('./db/About')
const Latest = require('./db/Latest')
const Cladding = require('./db/Cladding')
const Thermal = require('./db/Thermal')
const Curtain = require('./db/Curtain')
const Roofing = require('./db/Roofing')
const NewDiv = require('./db/NewDiv')
const DivImage = require('./db/ImageDiv')
const cloudinary = require('cloudinary').v2;
const Image = require('./db/Image')
const { CloudinaryStorage } = require('multer-storage-cloudinary');



const port = process.env.PORT || 10000;







app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Serve your React app (build it first)
// app.use(express.static('client/build'));
require('./db/Config')
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Set up CloudinaryStorage for Cloudinary file uploads
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
// Set up Multer for file uploads





const uploadCloudinary = multer({ storage: cloudinaryStorage });

app.use(express.static("public"))
// Serve your React app (build it first)
app.use(express.static('client/build'));

app.post('/api/image-upload', uploadCloudinary.single('image'), async (req, res) => {
  try {
    const image = new Image({ url: req.file.path });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});





app.post('/api/about', uploadCloudinary.single('aboutImage'), async (req, res) => {
  try {
    const { title, mainPara, dream, vision, mission } = req.body;
    let aboutImage = null;
    if (req.file) {
      aboutImage = {
        filename: req.file.filename,
        url: req.file.path
      };
    }

    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        title,
        mainPara: JSON.parse(mainPara),
        dream: JSON.parse(dream),
        vision: JSON.parse(vision),
        mission: JSON.parse(mission),
        aboutImage
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedAbout);
  } catch (error) {
    console.error('Error creating new About document:', error);
    res.status(500).json({ error: 'Failed to create or update About document' });
  }
});

app.post('/api/latest', uploadCloudinary.single('latestImage'), async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    let latestImage = null;
    if (req.file) {
      latestImage = {
        filename: req.file.filename,
        url: req.file.path
      };
    }

    const newLatest = new Latest({
      title,
      paragraph,
      latestImage
    });

    const savedLatest = await newLatest.save();
    res.status(201).json(savedLatest);
  } catch (error) {
    console.error('Error creating Latest News:', error);
    res.status(500).json({ error: 'Failed to create Latest News' });
  }
});

app.post('/api/div-image', uploadCloudinary.single('divImage'), async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    let divImage = null;
    if (req.file) {
      divImage = {
        filename: req.file.filename,
        url: req.file.path
      };
    }

    const newDivImage = new DivImage({
      title,
      paragraph,
      divImage
    });

    const savedDivImage = await newDivImage.save();
    res.status(201).json(savedDivImage);
  } catch (error) {
    console.error('Error creating Section with Image', error);
    res.status(500).json({ error: 'Failed to create Section with Image ' });
  }
});

app.post('/api/new-div', async (req, res) => {
  try {
    const { head, secPara } = req.body;
    const newDiv = new NewDiv({ head, secPara });
    const savedNewDiv = await newDiv.save();
    res.status(201).json(savedNewDiv);
  } catch (error) {
    console.error('Error creating new Section:', error);
    res.status(500).json({ error: 'Failed to create new section' });
  }
});

app.post('/api/cladding', uploadCloudinary.fields([
  { name: 'claddingImage', maxCount: 1 }, { name: 'claddingImage1', maxCount: 1 }, { name: 'claddingImage2', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, mainParagraph, subHead1, subHead2, paraSub1, paraSub2 } = req.body;
    let claddingImage = null;
    let claddingImage1 = null;
    let claddingImage2 = null;

    if (req.files && req.files['claddingImage']) {
      claddingImage = {
        filename: req.files['claddingImage'][0].filename,
        url: req.files['claddingImage'][0].path
      };
    }
    if (req.files && req.files['claddingImage1']) {
      claddingImage1 = {
        filename: req.files['claddingImage1'][0].filename,
        url: req.files['claddingImage1'][0].path
      };
    }
    if (req.files && req.files['claddingImage2']) {
      claddingImage2 = {
        filename: req.files['claddingImage2'][0].filename,
        url: req.files['claddingImage2'][0].path
      };
    }

    const updatedCladding = await Cladding.findOneAndUpdate(
      {},
      {
        title,
        mainParagraph: JSON.parse(mainParagraph),
        subHead1,
        subHead2,
        paraSub1,
        paraSub2,
        claddingImage,
        claddingImage1,
        claddingImage2
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedCladding);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/post-thermal', uploadCloudinary.fields([
  { name: 'thermalImage', maxCount: 1 }, { name: 'thermalImage1', maxCount: 1 }, { name: 'thermalImage2', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, mainParagraph, subHead1, subHead2, paraSub1, paraSub2 } = req.body;
    let thermalImage = null;
    let thermalImage1 = null;
    let thermalImage2 = null;

    if (req.files && req.files['thermalImage']) {
      thermalImage = {
        filename: req.files['thermalImage'][0].filename,
        url: req.files['thermalImage'][0].path
      };
    }
    if (req.files && req.files['thermalImage1']) {
      thermalImage1 = {
        filename: req.files['thermalImage1'][0].filename,
        url: req.files['thermalImage1'][0].path
      };
    }
    if (req.files && req.files['thermalImage2']) {
      thermalImage2 = {
        filename: req.files['thermalImage2'][0].filename,
        url: req.files['thermalImage2'][0].path
      };
    }

    const updatedThermal = await Thermal.findOneAndUpdate(
      {},
      {
        title,
        mainParagraph: JSON.parse(mainParagraph),
        subHead1,
        subHead2,
        paraSub1,
        paraSub2,
        thermalImage,
        thermalImage1,
        thermalImage2
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedThermal);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/post-curtain', uploadCloudinary.fields([
  { name: 'curtainImage', maxCount: 1 }, { name: 'curtainImage1', maxCount: 1 }, { name: 'curtainImage2', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, mainParagraph, subHead1, subHead2, paraSub1, paraSub2 } = req.body;
    let curtainImage = null;
    let curtainImage1 = null;
    let curtainImage2 = null;

    if (req.files && req.files['curtainImage']) {
      curtainImage = {
        filename: req.files['curtainImage'][0].filename,
        url: req.files['curtainImage'][0].path
      };
    }
    if (req.files && req.files['curtainImage1']) {
      curtainImage1 = {
        filename: req.files['curtainImage1'][0].filename,
        url: req.files['curtainImage1'][0].path
      };
    }
    if (req.files && req.files['curtainImage2']) {
      curtainImage2 = {
        filename: req.files['curtainImage2'][0].filename,
        url: req.files['curtainImage2'][0].path
      };
    }

    const updatedCurtain = await Curtain.findOneAndUpdate(
      {},
      {
        title,
        mainParagraph: JSON.parse(mainParagraph),
        subHead1,
        subHead2,
        paraSub1,
        paraSub2,
        curtainImage,
        curtainImage1,
        curtainImage2
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedCurtain);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/post-roofing', uploadCloudinary.fields([
  { name: 'roofingImage', maxCount: 1 }, { name: 'roofingImage1', maxCount: 1 }, { name: 'roofingImage2', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, mainParagraph, subHead1, subHead2, paraSub1, paraSub2 } = req.body;
    let roofingImage = null;
    let roofingImage1 = null;
    let roofingImage2 = null;

    if (req.files && req.files['roofingImage']) {
      roofingImage = {
        filename: req.files['roofingImage'][0].filename,
        url: req.files['roofingImage'][0].path
      };
    }
    if (req.files && req.files['roofingImage1']) {
      roofingImage1 = {
        filename: req.files['roofingImage1'][0].filename,
        url: req.files['roofingImage1'][0].path
      };
    }
    if (req.files && req.files['roofingImage2']) {
      roofingImage2 = {
        filename: req.files['roofingImage2'][0].filename,
        url: req.files['roofingImage2'][0].path
      };
    }

    const updatedRoofing = await Roofing.findOneAndUpdate(
      {},
      {
        title,
        mainParagraph: JSON.parse(mainParagraph),
        subHead1,
        subHead2,
        paraSub1,
        paraSub2,
        roofingImage,
        roofingImage1,
        roofingImage2
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedRoofing);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


let users = [
    { email: 'fozengineering@gmail.com', password: 'admin001' },
    // Add more users as needed
];

app.post('/api/adminlogin', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the array
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
        // Authentication successful

        // Generate a token with user information
        const token = jwt.sign({ email: user.email, userId: user.id }, secretKey, { expiresIn: '1h' });

        // Include the token in the response
        res.status(200).json({ message: 'Login successful', token: token });
    } else {
        // Authentication failed
        res.status(401).json({ message: 'Invalid email or password' });
    }
});


app.get('/api/get-images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.get('/api/get-about', async (req, res) => {
    try {
      
      const about = await About.findOne();
  
      if (!about) {
        return res.status(404).json({ message: 'About info not found' });
      }
  
      res.status(200).json(about);
    } catch (error) {
      console.error('Error fetching about:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-latest', async (req, res) => {
    try {
      
      const latest = await Latest.find();
      if (!latest) {
        return res.status(404).json({ message: 'Latest info not found' });
      }
  
      res.status(200).json(latest);
    } catch (error) {
      console.error('Error fetching latest:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-cladding', async (req, res) => {
    try {
      
      const cladding = await Cladding.findOne();
  
      if (!cladding) {
        return res.status(404).json({ message: 'Cladding info not found' });
      }
  
      res.status(200).json(cladding);
    } catch (error) {
      console.error('Error fetching cladding:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-thermal', async (req, res) => {
    try {
      
      const thermal = await Thermal.findOne();
  
      if (!thermal) {
        return res.status(404).json({ message: 'Thermal info not found' });
      }
  
      res.status(200).json(thermal);
    } catch (error) {
      console.error('Error fetching thermal:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-curtain', async (req, res) => {
    try {
      
      const curtain = await Curtain.findOne();
  
      if (!curtain) {
        return res.status(404).json({ message: 'Curtain info not found' });
      }
  
      res.status(200).json(curtain);
    } catch (error) {
      console.error('Error fetching curtain:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-roofing', async (req, res) => {
    try {
      
      const roofing = await Roofing.findOne();
  
      if (!roofing) {
        return res.status(404).json({ message: 'Roofing info not found' });
      }
  
      res.status(200).json(roofing);
    } catch (error) {
      console.error('Error fetching roofing:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-div-image', async (req, res) => {
    try {
      
      const divImage = await DivImage.find();
  
      if (!divImage) {
        return res.status(404).json({ message: 'Section not found' });
      }
  
      res.status(200).json(divImage);
    } catch (error) {
      console.error('Error fetching Section:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/get-new-div', async (req, res) => {
    try {
      
      const newDiv = await NewDiv.findOne();
  
      if (!newDiv) {
        return res.status(404).json({ message: 'Section not found' });
      }
  
      res.status(200).json(newDiv);
    } catch (error) {
      console.error('Error fetching Section:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/delete-latest/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID and delete it
        const deletedLatest = await Latest.findByIdAndDelete(id);

        if (!deletedLatest) {
            return res.status(404).json({ error: 'Latest News not found' });
        }

        // If the document has an image, delete the image file from the server
        if (deletedLatest.latestImage) {
            const filePath = path.join(__dirname, deletedLatest.latestImage.filepath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete image file:', err);
                }
            });
        }

        // Send a success response
        res.status(200).json({ message: 'Latest News deleted successfully' });
    } catch (error) {
        console.error('Error deleting Latest News:', error);
        res.status(500).json({ error: 'Failed to delete Latest News' });
    }
});

app.delete('/api/delete-section-image/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Find the document by ID and delete it
      const deletedDivImage = await DivImage.findByIdAndDelete(id);

      if (!deletedDivImage) {
          return res.status(404).json({ error: 'Section not found' });
      }

      // If the document has an image, delete the image file from the server
      if (deletedDivImage.divImage && deletedDivImage.divImage.filepath) {
          const filePath = path.join(__dirname, deletedDivImage.divImage.filepath);
          fs.unlink(filePath, (err) => {
              if (err) {
                  console.error('Failed to delete image file:', err);
              }
          });
      }

      // Send a success response
      res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
      console.error('Error deleting section:', error);
      res.status(500).json({ error: 'Failed to delete section' });
  }
});




app.delete('/api/delete-section/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID and delete it
        const deletedSection = await NewDiv.findByIdAndDelete(id);

        if (!deletedSection) {
            return res.status(404).json({ error: 'Section  not found' });
        }

        // If the document has an image, you might also want to delete the image file from the server
        // Add file deletion logic here if necessary

        // Send a success response
        res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
        console.error('Error deleting section :', error);
        res.status(500).json({ error: 'Failed to delete section ' });
    }
});

app.delete('/api/delete-images/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Find the document by ID and delete it
      const deletedImage = await Image.findByIdAndDelete(id);

      if (!deletedImage) {
          return res.status(404).json({ error: 'Image not found' });
      }

      // If the document has an image, you might also want to delete the image file from the server
      // Add file deletion logic here if necessary

      // Send a success response
      res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
      console.error('Error deleting image :', error);
      res.status(500).json({ error: 'Failed to delete image ' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
