import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import FormInput from "../components/form/FormInput";
import FormPanel from "../components/form/FormPanel";
import ImagePicker from "../components/form/ImagePicker";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import { Validators } from "../utils/validation";

export default function AddPlace() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const { formState, inputHandler } = useForm([
		"title",
		"description",
		"address",
		"image",
	]);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("title", formState.inputs.title.value as string);
		formData.append(
			"description",
			formState.inputs.description.value as string
		);
		formData.append("address", formState.inputs.address.value as string);
		formData.append("image", formState.inputs.image.value as Blob);
		try {
			await sendRequest(
				import.meta.env.PUBLIC_APP_BACKEND_API_URL + "/places",
				"POST",
				{
					Authorization: "Bearer " + authContext.token,
				},
				formData
			);
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && <Spinner asOverlay />}
			<FormPanel className="place-add-form" onSubmit={submitHandler}>
				<FormInput
					type="text"
					name="title"
					label="Title"
					validations={[Validators.required()]}
					onInput={inputHandler}
				/>
				<FormInput
					as="textarea"
					name="description"
					label="Description"
					validations={[Validators.minLength(5)]}
					onInput={inputHandler}
				/>
				<FormInput
					type="text"
					name="address"
					label="Address"
					validations={[Validators.required()]}
					onInput={inputHandler}
				/>
				<ImagePicker name="image" previewWidth="20rem" onInput={inputHandler} />
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</FormPanel>
		</>
	);
}
