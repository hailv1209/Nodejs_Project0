const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/fileService");
const Joi = require('joi')
const {
  createCustomerService,
  createArrayCustomerService,
  getCustomerService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteArrayCustomersService,
} = require("../services/customerService");
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

  //   const schema = Joi.object({
  //     name: Joi.string()
  //         .alphanum()
  //         .min(3)
  //         .max(30)
  //         .required(),
  
  //     address: Joi.string(),
  
  //     phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')),
  
  //     email: Joi.string()
  //         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  //     description : Joi.string()
  
  
  // })
  //   const {error} = schema.validate(req.body, {abortEarly : false});

  //   return res.status(400).json({
  //     error : error
  //   })

    let ImageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await uploadSingleFile(req.files.image);
      ImageUrl = result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      ImageUrl,
    };
    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      error: 0,
      data: customer,
    });
  },
  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        error: 0,
        data: customers,
      });
    } else {
      return res.status(400).json({
        error: -1,
        data: customers,
      });
    }
  },
  getCustomer: async (req, res) => {
    // let limit = req.query.limit;
    // let page = req.query.page;
    // let name = req.query.name
    let queryString = req.query
    let customers = null;
    if (queryString) {
      customers = await getCustomerService(queryString);
    } else {
      customers = await getCustomerService();
    }
    return res.status(200).json({
        error: 0,
        data: customers,
      });
  },
  putUpdateCustomer: async (req, res) => {
    let customer = await putUpdateCustomerService(req.body);
    return res.status(200).json({
      error: 0,
      data: customer,
    });
  },
  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    let result = await deleteACustomerService(id);
    return res.status(200).json({
      error: 0,
      data: result,
    });
  },
  deleteArrayCustomer: async (req, res) => {
    let customersId = req.body.customersId;
    let result = await deleteArrayCustomersService(customersId);
    if (result) {
      return res.status(200).json({
        error: 0,
        data: result,
      });
    } else {
      return res.status(400).json({
        error: -1,
        data: result,
      });
    }
  },
};
