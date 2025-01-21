import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, UploadFile, Space, Select, Checkbox, notification } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { IAnimalCreate, ISelectParams } from '../../interfaces/animals';
import { useCreateAnimalMutation, useGetAnimalSelectItemsQuery } from '../../services/apiAnimal';

const CreateAnimalPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm<IAnimalCreate>();
    const [createAnimal] = useCreateAnimalMutation();
    const { data: selectItems } = useGetAnimalSelectItemsQuery();

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [isPurebred, setIsPurebred] = useState<boolean>(false);

    const [params, setParams] = useState<ISelectParams>({
        species: {},
        gender: {},
        age: {},
        breed: {}
    });

    useEffect(() => {
        if (selectItems) {
            setParams({
                species: selectItems.species || {},
                gender: selectItems.gender || {},
                age: selectItems.age || {},
                breed: selectItems.breed || {}
            });
        }
    }, [selectItems]);

    const onSubmit = async (values: IAnimalCreate) => {
        try {
            const animalData = {
                ...values,
                neutered: values.neutered || false,
                vaccinated: values.vaccinated || false,
                breed: values.breed || '',
                description: values.description || '',
            };
            console.log("Send Data:", animalData);
            console.log("Images:", animalData.uploaded_images);

            const convertToFormData = (data: Record<string, any>, parentKey: string = ''): FormData => {
                const formData = new FormData();

                Object.entries(data).forEach(([key, value]) => {
                    const formKey = parentKey ? `${parentKey}[${key}]` : key;

                    if (value instanceof File) {
                        formData.append(formKey, value);
                    } else if (Array.isArray(value)) {
                        // Handle arrays
                        value.forEach((item, index) => {
                            const arrayKey = `${formKey}[${index}]`;
                            if (item instanceof File) {
                                formData.append(arrayKey, item);
                            } else if (typeof item === 'object') {
                                // Recursively handle objects within arrays
                                const nestedFormData = convertToFormData(item, arrayKey);
                                nestedFormData.forEach((val, nestedKey) => {
                                    formData.append(nestedKey, val);
                                });
                            } else {
                                formData.append(arrayKey, item);
                            }
                        });
                    } else if (typeof value === 'object' && value !== null) {
                        // Recursively handle nested objects
                        const nestedFormData = convertToFormData(value, formKey);
                        nestedFormData.forEach((val, nestedKey) => {
                            formData.append(nestedKey, val);
                        });
                    } else {
                        // Handle primitive values
                        formData.append(formKey, value);
                    }
                });

                return formData;
            };

            // Convert animalData to FormData
            const formData = convertToFormData(animalData);

            const response = await createAnimal(formData).unwrap();
            console.log("Animal created:", response);

            notification.success({
                message: 'Animal created!',
                description: 'The animal was created successfully!',
            });

            navigate(`/adopt`);

        } catch {
            notification.error({
                message: 'Creation failed',
                description: 'Unable to create animal. Try again later.',
            });
        }
    };

    const filterOptions = (options: Record<string, string>) => {
        return Object.entries(options).filter(([value]) => value !== "All" && value !== "All pets");
    };

    return (
        <>
            <p className="text-center text-3xl font-bold mt-[120px] mb-7">Create Animal</p>
            <Form form={form} onFinish={onSubmit} labelCol={{ span: 7 }} wrapperCol={{ span: 11 }}>
                <Form.Item name="name" label="Name" hasFeedback
                    rules={[{ required: true, message: 'Please provide a valid name.' }]}>
                    <Input placeholder='Type animal name' />
                </Form.Item>

                <Form.Item name="species" label="Species" hasFeedback
                    rules={[{ required: true, message: 'Please provide a species type.' }]}>
                    <Select placeholder="Species">
                        {filterOptions(params.species).map(([key, value]) => (
                            <Select.Option key={value} value={value}>
                                {key}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="gender" label="Sex" hasFeedback
                    rules={[{ required: true, message: 'Please provide a sex.' }]}>
                    <Select placeholder="Sex">
                        {filterOptions(params.gender).map(([key, value]) => (
                            <Select.Option key={value} value={value}>
                                {key}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="age" label="Age" hasFeedback
                    rules={[{ required: true, message: 'Please provide an age.' }]}>
                    <Select placeholder="Age">
                        {filterOptions(params.age).map(([key, value]) => (
                            <Select.Option key={value} value={value}>
                                {key}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="breed" label="Breed" hasFeedback>
                    <Select placeholder="Breed" onChange={(value) => setIsPurebred(value === "Purebred")}>
                        {filterOptions(params.breed).map(([key, value]) => (
                            <Select.Option key={value} value={value}>
                                {key}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {isPurebred && (
                    <Form.Item name="breedInput" label="Enter Breed" hasFeedback>
                        <Input placeholder="Type breed" />
                    </Form.Item>
                )}

                <Form.Item name="location" label="Location" hasFeedback
                    rules={[{ required: true, message: 'Please provide a location.' }]}>
                    <Input placeholder='Type location' />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder='Write a description' rows={4} />
                </Form.Item>

                <Form.Item label="Additional info" className='mb-0'>
                    <Form.Item name="neutered" className='mb-2' valuePropName="checked">
                        <Checkbox>Neutered</Checkbox>
                    </Form.Item>
                    <Form.Item name="vaccinated" valuePropName="checked">
                        <Checkbox>Vaccinated</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item name="uploaded_images" label="Photo" valuePropName="Image"
                    rules={[{ required: true, message: "Please provide an animal image." }]}
                    getValueFromEvent={(e: UploadChangeParam) => {
                        return e?.fileList.map(file => file.originFileObj);
                    }}>

                    <Upload beforeUpload={() => false} accept="image/*" maxCount={10} listType="picture-card" multiple
                        onPreview={(file: UploadFile) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }

                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                        }}>

                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
                    <Space>
                        <Link to={"/adopt"}>
                            <Button htmlType="button" className='text-white bg-gradient-to-br from-red-400 to-purple-500 font-medium rounded-lg px-5'>Cancel</Button>
                        </Link>
                        <Button htmlType="submit" className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Create</Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default CreateAnimalPage;