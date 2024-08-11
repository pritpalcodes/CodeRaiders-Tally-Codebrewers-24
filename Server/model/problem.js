import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  inputText: {
    type: String,
    required: true,
  },
  outputText: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'], // to enforce difficulty levels
  },
  category: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  toInputData: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  examples: [exampleSchema], 
  constraints: {
    type: String,
    required: true,
  },
  starterCode: {
    type: String,
    required: true,
  },
  starterFunctionName: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;