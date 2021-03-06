import moment from "moment";
import { Task } from "../models/task.model";
/**
 * @description GenericRepository
 * @class GenericRepository
 */

/**
 * @description create a new document
 * @param {Model} Model
 * @param {option} options
 * @returns {document} returns a newly created document
 */

async function create(Model, options) {
  try {
    const document = await Model.create(options);
    return document;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all events in a day
 * @param {object} Model
 * @returns {Document} Resolves paginated array of documents.
 */

async function tasksToday({ limit, page }) {
  try {
    const dayStart = moment.utc().startOf("day"); // set to 12:00 am today
    const dayEnd = moment.utc().endOf("day"); // set to 23:59 pm today

    const documents = await Task.find(
      {
        createdAt: {
          $gte: dayStart,
          $lt: dayEnd,
        },
      },
      null,
      {
        skip: page * limit,
      }
    )
      .limit(limit)
      .sort("-createdAt")
      .exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all events in a week
 * @param {object} Model
 * @returns {Document} Resolves paginated array of documents.
 */

async function tasksADayWeekMonth(dayStart, dayEnd, { limit, page }) {
  try {
    const documents = await Task.find(
      {
        createdAt: {
          $gte: new Date(dayStart).toISOString(),
          $lt: new Date(dayEnd).toISOString(),
        },
      },
      null,
      {
        skip: page * limit,
      }
    )
      .limit(limit)
      .sort("-createdAt")
      .exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description deletes a document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Deletes a particular Document
 */

 async function deleteRecord(Model, id) {
  try {
    const documents = await Model.findByIdAndRemove({ _id: id });

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all documents
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Resolves paginated array of documents.
 */

async function GetAllDocs(Model, options) {
  try {
    const documents = await Model.find({}, null, {
      skip: options.page * options.limit,
    })
      .limit(options.limit)
      .sort("-createdAt")
      .exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description update a document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Updates a particular Document
 */

async function update(Model, id, options) {
  try {
    const documents = await Model.findOneAndUpdate({ _id: id }, options, {
      new: true,
      runValidators: true,
    });
    return documents;
  } catch (error) {
    throw error;
  }
}


/**
 * @description Fetch one document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Gets a particular Document
 */

async function findById(Model, id) {
  try {
    const documents = await Model.findOne({ _id: id }).exec();
    return documents;
  } catch (error) {
    throw error;
  }
}
export default {
  create,
  update,
  deleteRecord,
  tasksToday,
  tasksADayWeekMonth,
  GetAllDocs,
  findById,
};
