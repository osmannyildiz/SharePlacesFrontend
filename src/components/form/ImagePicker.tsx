import { useEffect, useRef, useState } from "react";
import FileInputValue from "../../models/FileInputValue";
import cn from "../../utils/classNamesHelper";
import Button from "./Button";
import "./ImagePicker.scss";

interface Props {
	name: string;
	previewWidth?: string;
	center?: boolean;
	onInput: (name: string, value: Blob | null, isValid: boolean) => void;
}

export default function ImagePicker(props: Props) {
	const [imageFile, setImageFile] = useState<FileInputValue>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const filePickerRef = useRef<HTMLInputElement | null>(null);

	// Generate preview
	useEffect(() => {
		if (!imageFile) return;

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result as string);
		};
		fileReader.readAsDataURL(imageFile);
	}, [imageFile]);

	const pickImageHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		let _imageFile = imageFile;
		let _isValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			_imageFile = event.target.files[0];
			_isValid = true;
		} else {
			_isValid = false;
		}
		setImageFile(_imageFile);
		setIsValid(_isValid);
		setIsTouched(true);
		props.onInput(props.name, _imageFile, _isValid);
	};

	return (
		<div
			className={cn(
				"image-picker form-input",
				props.center && "image-picker--center",
				!isValid && isTouched && "image-picker--invalid"
			)}
		>
			<input
				type="file"
				accept=".jpg,.jpeg,.png"
				name={props.name}
				style={{ display: "none" }}
				ref={filePickerRef}
				onChange={pickImageHandler}
			/>
			<div className="image-picker__ui">
				<div
					className="image-picker__preview"
					style={props.previewWidth ? { width: props.previewWidth } : {}}
				>
					{previewUrl ? (
						<img
							className="image-picker__preview-img"
							src={previewUrl}
							alt="Preview"
						/>
					) : (
						<p>
							<strong>Please pick an image.</strong>
						</p>
					)}
				</div>
				<Button type="button" onClick={() => filePickerRef.current?.click()}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
}
