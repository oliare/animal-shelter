import { Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
    title: string;
    description: string;
    onSubmit: () => void;
    children?: React.ReactNode; 
}

export const DeleteDialog: React.FC<Props> = ({ title, description, onSubmit, children }) => {
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        setOpen(false);
        onSubmit();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <DeleteOutlined />
            </button>

            <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}
                okText="Delete" cancelText="Cancel" closeIcon={ <ExclamationCircleOutlined />}
                okButtonProps={{
                    style: { backgroundColor: "#ff4d4f", color: "#fff" },
                }}>
                <p>{description}</p>
                {children}
            </Modal>
        </>
    );
};
