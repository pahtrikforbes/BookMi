const mongoose = require("mongoose");
const Appointment = mongoose.model("appointments");
const { appointment } = require("../utils/schemas");

exports.createAppointment = async (req, res) => {
    let { error } = appointment.validate(req.body, {
      abortEarly: false,
    });
  
    //If there is an error return a response with proper status code
    if (error) {
      return res
        .status(400)
        .send(
          `Validation error: ${error.details.map((x) => x.message).join(", ")}`
        );
    }

    // check if the user already created appointment for today. Users can only create one appointment per day
    const alreadyCreated = await Appointment.findOne({user: req.body.user, date: req.body.date})
  
    if(!alreadyCreated){

    const slotTaken = await Appointment.findOne({date: req.body.date, time: req.body.time})

    if(!slotTaken){
      const newAppointment = await new Appointment(req.body).save();

      if(newAppointment){
        console.log("Appointment created")
      return res.send({appointment: newAppointment, message: 'Your appointment has been created and awaiting confirmation from your beautician.'});}
      else {
        console.error(newAppointment)
        return res.status(500).send({ message: `Error creating appointment` });
      }
    }else return res.status(400).send({message: `This appointment time is unavailable.`})
    }else return res.status(400).send({message: `You have already created an appointment for today.`})
  };
  
  exports.getAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id).exec();
      if (!appointment)
        return res
          .status(404)
          .send({ message: `Appoinment with the given id not found` });
      return res.send(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `Error retrieving appointment` });
    }
  };

  exports.getAppointments = async (req, res) => {
    const query =
    req.query.date !== undefined
      ? {
          date: req.query.date,
        }
      : {};

    try {
      const perPage =
        parseInt(req.query.perPage) > 30 || !req.query.perPage
          ? 20
          : parseInt(req.query.perPage);
  
      const pageNo = parseInt(req.query.pageNo) || 1;
      let pagination = {
        limit: perPage,
        skip: perPage * (pageNo - 1),
      };
  
      Appointment.find(query)
        .populate("users")
        .sort({ _id: -1 })
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(async (err, docs) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ message: `Error retrieving appointments` });
          }

          if (docs.length === 0)
            return res.status(404).send({ message: `No appoinments found` });

            Appointment.estimatedDocumentCount(query).exec((err, count) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .send({ message: `Error counting appoinments` });
            }

            return res.send({ total: count, appointments: docs });
          });
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `Error retrieving appointments` });
    }
  };

  
exports.updateAppointment = async (req, res) => {
  try {

    const slotTaken = await Appointment.findOne({date: req.body.date, time: req.body.time})
    let appointment = null

    if(slotTaken){
      if(slotTaken.status !== req.body.status){
        appointment = await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
      }else{
        return res
        .status(400)
        .send({ message: `This appointment cannot be scheduled for this date or time.` });
      }
    }else{
      appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
    }
  
    if (!appointment)
      return res
        .status(404)
        .send({ message: `Appointment with the given id not found` });

    return res.send(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `error updating appointment` });
  }
};

  exports.deleteAppointment = async (req, res) => {
    try {
      const appoinment = await Appointment.findByIdAndDelete(req.params.id).exec();
      if (!appoinment)
        return res
          .status(404)
          .send({ message: `Appoinment with given id not found` });
      return res.send({ message: `Appointment deleted` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `error deleting appointment` });
    }
  };
  