import prisma from "../config/prismaConfig.js";

const createResidency = async (req, res) => {
    try {
        const { title,description,price,address,city,country,userEmail,image,facilities} = req.body.data;
        console.log(req.body);

        const Residency=await prisma.residency.create(
            {
                data:{
                    title,
                    description,
                    price,
                    address,
                    city,
                    country,
                    owner:{connect:{email:userEmail}},
                    image,
                    facilities
                }
            }
        );

res.send({message:"recidency created!"})
        
        
        
    } catch (err) {
      if (err.code==='p2002') {
        throw new Error("Recidency with this address alredy there ")
      }
      throw new Error(err.message)
    }
}

const getRecidency=async(req,res)=>{
    try {
        const recidency=await prisma.residency.findMany({orderBy:{
            creatTime:"desc"
        }})

        res.send({recidency})
    } catch (e) {
        new Error(e.message)
    }
}

const getRecidencybyID=async(req,res)=>{
try {
    const {id}=req.params;
    const recidencybyid=await prisma.residency.findUnique({where:{id}})
    res.send({recidencybyid})
} catch (e) {
    res.send(e.message);
}
}

export { createResidency,getRecidency ,getRecidencybyID};
