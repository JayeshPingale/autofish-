import { useState } from 'react';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully');
                setPreview(result.imageUrl); // Display uploaded image's URL as a preview
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image');
        }
    };

    return (
        <div className="file-upload">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="submit">Upload</button>
            </form>

            {preview && (
                <div className="preview">
                    <h3>Image Preview:</h3>
                    <img src={preview} alt="Preview" style={{ width: '300px', marginTop: '10px' }} />
                </div>
            )}
        </div>
    );
}

export default FileUpload;
