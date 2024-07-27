import React, { useState } from 'react';
import axios from 'axios';

const FileInput: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Iltimos, fayl tanlang!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('YOUR_SERVER_URL/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Fayl muvaffaqiyatli yuklandi!');
        } catch (error) {
            console.error('Fayl yuklashda xatolik:', error);
            alert('Fayl yuklashda xatolik yuz berdi.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Faylni Yuklash
            </button>
        </div>
    );
};

export default FileInput;
