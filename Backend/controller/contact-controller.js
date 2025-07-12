import Contact from '../models/contact-model.js'

const contactForm = async(req,res)=>{
    try {
        const response = req.body;
        await Contact.create(response)
        return res.status(200).json({message:"contact details submitted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"contact details not submitted "})
    }
}

export default contactForm