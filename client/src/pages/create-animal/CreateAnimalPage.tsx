import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, UploadFile, Space, Select, Checkbox, Col, Row } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { http_service } from '../../api';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { IAnimalCreate, ISelectParams } from '../../interfaces/animals';
// import Loader from '../../common/loader/Loader';

const CreateAnimalPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm<IAnimalCreate>();
    // const [loading, setLoading] = useState<boolean>(false);

    const [params, setParams] = useState<ISelectParams>({
        species: {},
        gender: {},
        age: {},
        breed: {}
    });
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [isPurebred, setIsPurebred] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        http_service.get<ISelectParams>("animals/select-items/")
            .then(resp => {
                setParams(resp.data);
            });
    }, []);


    const onSubmit = async (values: IAnimalCreate) => {
        // setLoading(true);
        try {
            const animalData = {
                ...values,
                vaccinated: values.vaccinated !== undefined ? values.vaccinated : false,
                neutered: values.neutered !== undefined ? values.neutered : false,
            };
            console.log("Send Data:", animalData);

            http_service.post("animals/create/", animalData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(resp => {
                    console.log("Animal created:", resp.data);
                    navigate(`/adopt`);
                });
        } catch (error) {
            console.error("Error creating animal:", error);
        } finally {
            // setLoading(false);
        }
    };

    const filterOptions = (options: Record<string, string>) => {
        return Object.entries(options).filter(([value]) => value !== "All" && value !== "All pets");
    };

    return (
        // <> {loading ? (
        // <Loader />
        // ) : (
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

                <Form.Item label="Additional info" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="neutered" initialValue={false} valuePropName="checked"                            >
                                <Checkbox>Neutered</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="vaccinated" initialValue={false} valuePropName="checked" >
                                <Checkbox>Vaccinated</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
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
        // )}
        // </>
    );
};

export default CreateAnimalPage;