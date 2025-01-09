import styles from './AdoptHomePage.module.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { IAnimalList } from '../../intarfaces/animals';
import { http_service } from '../../api';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdoptPage: React.FC = () => {
    const userRole = 'admin';
    
    const [items, setItems] = useState<IAnimalList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
    
    // for adopt button visibility
    const isHomePage = location.pathname === '/' || location.pathname === '/home';

    useEffect(() => {
        http_service
            .get<IAnimalList[]>('http://127.0.0.1:8000/animals/')
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

    return (
        <>

            <div className={`${styles.container} mt-[70px]`}>
                <h2 className="font-bold text-center my-8">Adopt a Pet</h2>
                <p className="text-center text-lg mb-8">Find your new furry friend! Browse our list of animals available for adoption and make a difference in their life 🐾</p>

                <div className='mb-5'>
                    <div className="flex items-center">
                        <p className='font-semibold text-xl mr-4 items-center'>Filters</p>
                        <div className="cursor-pointer" onClick={toggleFilters}>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>

                        {isHomePage && (
                            <div className={`${styles.adopt} ml-auto`}>
                                <button className={styles.btnAllPets}>
                                    <Link to={'/adopt'}>All pets</Link>
                                </button>
                            </div>
                        )}

                    </div>

                    {filtersVisible && (

                        <div className="flex my-6">
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

                <div className="flex flex-wrap justify-between">
                    {items && Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <Card className='shadow-lg mb-10'
                                key={item.id}
                                style={{ width: 300 }}
                                cover={
                                    <img src="images/pet-placeholder.png"
                                        alt={item.name}
                                    />
                                }
                                actions={
                                    userRole === 'admin'
                                        ? [
                                            <SettingOutlined key="setting" />,
                                            <EditOutlined key="edit" />,
                                            <EllipsisOutlined key="ellipsis" />,
                                        ]
                                        : [<Button className='btnAdopt'></Button>]
                                }
                            >
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

export default AdoptPage;
