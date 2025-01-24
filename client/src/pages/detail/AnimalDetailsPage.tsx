import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultPhoto from '/images/pet-placeholder.png';
import { useGetAnimalQuery } from '../../services/apiAnimal';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography, Descriptions } from 'antd';
import PhotoCarousel from '../../common/carousel/PhotoCarousel';

const { Title } = Typography;

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    navigate('/404');
    return null;
  }

  const { data: animal } = useGetAnimalQuery(Number(id));

  const [liked, setLiked] = useState(() => {
    return localStorage.getItem('liked') === 'true';
  });

  const toggleLike = () => {
    const likeState = !liked;
    setLiked(likeState);
    localStorage.setItem('liked', likeState.toString());
  };

  const animalImages = animal?.images?.map((image) => image.photo) || [defaultPhoto];

  return (
    <div className="animal-details-page p-10 mt-[70px]  d-flex align-items-center">
      <Row gutter={16}>
        <Col xs={24} sm={12} >
          <PhotoCarousel images={animalImages} />
        </Col>
        <Col xs={24} sm={12}>
          <Card
            style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
            <Title>{animal?.name}</Title>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Species">{animal?.species}</Descriptions.Item>
              <Descriptions.Item label="Sex">{animal?.gender}</Descriptions.Item>
              <Descriptions.Item label="Age">{animal?.age} years</Descriptions.Item>
              <Descriptions.Item label="Breed">{animal?.breed}</Descriptions.Item>
              <Descriptions.Item label="Location">{animal?.location}</Descriptions.Item>
              <Descriptions.Item label="Description">{animal?.description ? animal.description : 'No description yet'}</Descriptions.Item>
              <Descriptions.Item label="Vaccinated">
                {animal?.vaccinated ? 'Yes' : 'No'}
              </Descriptions.Item>
              <Descriptions.Item label="Neutered">
                {animal?.neutered ? 'Yes' : 'No'}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-6 d-flex align-items-center">
              <div className="flex items-center">
                <Button
                  icon={liked ? <HeartFilled style={{ color: 'dark' }} /> : <HeartOutlined />}
                  size="large" className="rounded-full"
                  onClick={toggleLike}>
                </Button>

                <Button type="default" size="large" className="rounded-full ml-5">
                  Adopt
                </Button>
              </div>
            </div>

          </Card>
        </Col>
      </Row>
    </div >
  );
};

export default AnimalDetailsPage;
