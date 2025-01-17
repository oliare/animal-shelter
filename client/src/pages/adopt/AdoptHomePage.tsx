import styles from './AdoptHomePage.module.css';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { IAnimalImage, IAnimalItem } from '../../interfaces/animals';
import { http_service } from '../../api';
import { Link } from 'react-router-dom';
import defaultPhoto from '/images/pet-placeholder.png'
import { DeleteDialog } from '../../common/delete-modal/DeleteModal';

const { Meta } = Card;

const AdoptPage: React.FC = () => {
    const userRole = 'admin';

    const [items, setItems] = useState<IAnimalItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
    const [images, setImages] = useState<IAnimalImage[]>([]);


    useEffect(() => {
        http_service
            .get<IAnimalImage[]>(`media/animals/1.jpg`)
    })

    // for adopt button visibility
    const isHomePage = location.pathname == '/' || location.pathname == '/home';
    console.log("API URL: ", import.meta.env.VITE_API_URL);

    useEffect(() => {
        http_service
            .get<IAnimalItem[]>(`/animals/`)
            .then((response) => {
                setItems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to load data');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const handleDelete = (id: number) => {
        try {
            http_service.delete(`animals/delete/${id}`)
            setItems(items.filter(i => i.id != id))
            console.log(`The product with id ${id} has been deleted`);
        } catch (error) {
            console.log("Animal deletion error: ", error);
        }
    }

    return (
        <>
            <div className={`${styles.container} mt-[40px] ml-5`}>
                <h2 className="font-bold text-center my-8">Adopt a Pet</h2>
                <p className="text-center text-lg mb-8">Find your new furry friend! Browse our list of animals available for adoption and make a difference in their life 🐾</p>

                <div className='mb-10'>
                    <div className="flex items-center">

                        {!isHomePage && (
                            <>
                                <p className='font-semibold text-xl mr-4 items-center'>Filters</p>
                                <div className="cursor-pointer" onClick={toggleFilters}>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </div>
                            </>
                        )}

                        {isHomePage && (
                            <div className={`${styles.adopt} ml-auto`}>
                                <button className={`${styles.btnAllPets} flex items-center`}>
                                    <Link to={'/adopt'}>All pets</Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-3">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}

                    </div>

                    {filtersVisible && (

                        <div className="flex mt-5 mb-12">
                            <Space wrap>
                                <Select
                                    defaultValue="lucy"
                                    style={{ width: 120 }}
                                    allowClear
                                    options={[{ value: 'lucy', label: 'Lucy' }]}
                                    placeholder="Sex"
                                />
                                <Select
                                    defaultValue="lucy"
                                    style={{ width: 120 }}
                                    allowClear
                                    options={[{ value: 'lucy', label: 'Lucy' }]}
                                    placeholder="Age"
                                />
                                <Select
                                    defaultValue="lucy"
                                    style={{ width: 120 }}
                                    allowClear
                                    options={[{ value: 'lucy', label: 'Lucy' }]}
                                    placeholder="Specie"
                                />
                            </Space>
                        </div>
                    )}

                </div>

                {/* <div className="flex flex-wrap justify-center items-center gap-10"> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 :grid-cols-4 lg:grid-cols-4 gap-8">

                    {items && Array.isArray(items) && items.length > 0 ? (
                        (isHomePage ? items.slice(0, 4) : items).map((item) => (

                            <Card
                                className={`${styles.card} shadow-lg mb-10`}
                                key={item.id}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        // src={defaultPhoto}
                                        src={item.images[0] ? `http://127.0.0.1:8000/media/animals/${item.images[0]}` : defaultPhoto}
                                        alt={item.name}
                                        className="w-full h-auto"
                                    />
                                }
                                actions={
                                    userRole === 'admin'
                                        ? [
                                            <Link to={`/update/${item.id}`}><EditOutlined key="edit" /></Link>,
                                            <EllipsisOutlined key="ellipsis" />,
                                            <DeleteDialog title={"Notification"}
                                                description={`Are you sure you want to delete '${item.name}'?`}
                                                onSubmit={() => handleDelete(item.id)}>
                                            </DeleteDialog>
                                        ]
                                        : [<Button className='btnAdopt'>Adopt</Button>]
                                }>
                                <Meta
                                    title={item.name}
                                    description={`Sex: ${item.gender}`}
                                />
                            </Card>

                        ))
                    ) : (
                        <div>No animals available</div>
                    )}
                </div>



            </div>
        </>
    );
};
