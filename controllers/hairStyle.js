const mongoose = require("mongoose");
const HairStyle = mongoose.model("hairStyles");
const { hairStyle } = require("../utils/schemas");

exports.createHairStyle = async (req, res) => {
  let { error } = hairStyle.validate(req.body, {
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

  let imageUrl;
  let imageId;
  if (req.file) {
    imageUrl = req.file.path;
    imageId = req.file.filename;
  }

  const newHairStyle = new HairStyle(
    Object.assign(req.body, { imageId, imageUrl })
  );

  newHairStyle
    .save()
    .then((data) => {
      console.log("HairStyle saved successfully");

      return res.send(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: `error saving HairStyle` });
    });
};

exports.updateHairStyle = async (req, res) => {
  let logoUrl;
  let logoId;
  if (req.file) {
    logoUrl = req.file.path;
    logoId = req.file.filename;
  }

  try {
    const hairStyle = await HairStyle.findByIdAndUpdate(
      req.params.id,
      {
        $set: Object.assign(req.body, { logoId, logoUrl }),
      },
      { new: true }
    );

    if (!hairStyle)
      return res
        .status(404)
        .send({ message: `Hair Style with the given id not found` });

    return res.send(hairStyle);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `error updating HairStyle` });
  }
};

exports.getHairStyle = async (req, res) => {
  try {
    const hairStyle = await HairStyle.findById(req.params.id).exec();
    if (!hairStyle)
      return res
        .status(404)
        .send({ message: `Hair Style with the given id not found` });
    return res.send(hairStyle);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Error retrieving Hair Style.` });
  }
};

exports.getHairStyles = async (req, res) => {
  //create query based on parameters received from request
  const query =
    req.query.category !== undefined
      ? {
          category: req.query.category,
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

    HairStyle.find(query)
      .populate("users")
      .sort({ _id: -1 })
      .limit(pagination.limit)
      .skip(pagination.skip)
      .exec(async (err, docs) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: `Error retrieving HairStyles` });
        }

        if (docs.length === 0)
          return res.status(404).send({ message: `No Hair Styles found` });

        if (req.query.category) {
          HairStyle.countDocuments(query).exec((err, count) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .send({ message: `Error counting Hair Styles` });
            }

            return res.send({ total: count, hairStyles: docs });
          });
        } else {
          HairStyle.estimatedDocumentCount(query).exec((err, count) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .send({ message: `Error counting Hair Styles.` });
            }

            return res.send({ total: count, hairStyles: docs });
          });
        }
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `Error retrieving HairStyles` });
  }
};

exports.deleteHairStyle = async (req, res) => {
  try {
    const HairStyle = await HairStyle.findByIdAndDelete(req.params.id).exec();
    if (!HairStyle)
      return res
        .status(404)
        .send({ message: `HairStyle with given id not found` });
    return res.send({ message: `HairStyle deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: `error deleting HairStyle` });
  }
};
