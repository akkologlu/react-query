type CreatePostFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
};
const CreatePostForm: React.FC<CreatePostFormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" id="title" name="title" />
      <textarea placeholder="Body" id="body" name="body" />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
