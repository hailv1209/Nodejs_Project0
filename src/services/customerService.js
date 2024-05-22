const aqp = require ('api-query-params');
const customer = require("../models/customer");
module.exports = {
  createCustomerService: async (customerData) => {
    try {
      let result = await customer.create({
        name: customerData.name,
        address: customerData.address,
        phone: customerData.phone,
        email: customerData.email,
        description: customerData.description,
        image: customerData.ImageUrl,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createArrayCustomerService: async (arr) => {
    try {
      let result = await customer.insertMany(arr);

      return result;
    } catch (error) {
      console.log(">> Error : ", error);
      return null;
    }
  },
  getCustomerService: async (queryString) => {
    try {
      let result = null;
    if(queryString)
        {
            const page = queryString.page
            delete queryString.page
            const { limit , filter } = aqp(queryString)
            console.log(filter)
             result = await customer
                .find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec()
        }else {
            result = await customer.find({});
        }



    //   if (limit && page) {
    //     let offset = (page - 1) * limit;

    //       result = await customer.find({}).skip(offset).limit(limit).exec();
    //   } else {
    //     result = await customer.find({});
    //   }
      return result;
    } catch (error) {
      console.log(">> Error : ", error);
      return null;
    }
  },
  putUpdateCustomerService: async (customers) => {
    try {
      let result = await customer.updateOne(
        { _id: customers._id },
        {
          name: customers.name,
          email: customers.email,
        }
      );
      return result;
    } catch (error) {
      console.log(">> Error : ", error);
      return null;
    }
  },
  deleteACustomerService: async (id) => {
    try {
      let result = await customer.deleteById(id);
      return result;
    } catch (error) {
      console.log(">> Error : ", error);
      return null;
    }
  },
  deleteArrayCustomersService: async (customersId) => {
    try {
      let result = await customer.delete({ _id: { $in: customersId } });
      return result;
    } catch (error) {
      console.log(">> Error : ", error);
      return null;
    }
  },
};
