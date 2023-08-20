import prisma from "../config/prismaConfig.js";

const registration = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        // Rest of the registration logic

        const newUser = await prisma.user.create({
            data: req.body
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: newUser
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the request.",
            error: error.message
        });
    }
}

const bookVisit = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.params;

        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedvisits: true }
        });
console.log(alreadyBooked);
        if (alreadyBooked.bookedvisits.some(visit => visit.id === id)) {
            return res.status(400).json({ message: "This residency is already booked by you." });
        } else {
            await prisma.user.update({
                where: { email },
                data: {
                    bookedvisits: { push: { id, date: new Date() } }
                }
            });

            return res.status(200).json({ message: "Visit booked successfully." });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the request.",
            error: error.message
        });
    }
}

const allBooking=async(req,res)=>{
try {
    const {email}=req.body;
   const allbook=await prisma.user.findUnique({
        where:{email},
        select:{bookedvisits:true}
    })
console.log(allbook.bookedvisits);
    return res.status(200).json({allbook });
    
    
} catch (e) {
    return res.status(400).json({ message: e.message });
}
}

const setFavariteResidency=(req,res)=>{
    try {
        const {email}=req.body;
        const {rid}=req.params;

        const fav=prisma.user.findUnique({
            where:{email},
            select:{favResidenciesID:true}
        })

        if (fav.favResidenciesID.includes(rid)) {
            const update=prisma.user.findUnique({
                where:{email},
                data:{
                    favResidenciesID:{
                        set:fav.favResidenciesID.filter((id)=>id!=rid)
                    }
                }

            })
        res.send({message:"update favrite",fav:update})

        }else{
            const update=prisma.user.findUnique({
                where:{email},
                data:{
                    favResidenciesID:{
                        set:rid
                    }
                }
            })
        res.send({message:"update favrite",fav:update})

        }
    } catch (error) {
        res.send(new Error({error}))
    }
}

const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { bookedVisits: true },
      });
  
      const index = user.bookedVisits.findIndex((visit) => visit.id === id);
  
      if (index === -1) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        user.bookedVisits.splice(index, 1);
        await prisma.user.update({
          where: { email },
          data: {
            bookedVisits: user.bookedVisits,
          },
        });
  
        res.send("Booking cancelled successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });
  

const getAllFavorites = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const favResd = await prisma.user.findUnique({
        where: { email },
        select: { favResidenciesID: true },
      });
      res.status(200).send(favResd);
    } catch (err) {
      throw new Error(err.message);
    }
  });

export { registration, bookVisit ,allBooking,setFavariteResidency,getAllFavorites,cancelBooking};



