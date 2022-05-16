import { Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const taskschema = new Schema ({
    title: {
        type: String,
        required: true, // requerido
        trim: true  // Esta funcion quita espacios al enviar el dato
    },
    description: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },

},{
    versionKey: false,
    timestamps:true
});

taskschema.plugin(mongoosePaginate);
export default model('Task', taskschema);