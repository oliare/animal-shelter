import { Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={1} style={{ fontSize: '6rem' }}>
          404
        </Title>
        <Text style={{ fontSize: '1.25rem', color: '#ff4d4f' }}>
          Oops! Data not found...
        </Text>
        <p className="lead" style={{ fontSize: '1.1rem', margin: '20px 0' }}>
          The item you're looking for doesn't exist.
        </p>
        <Space>
          <Link to="/">
            <Button htmlType="button" className='text-white bg-gradient-to-br from-red-400 to-purple-500 font-medium rounded-lg px-5'>Go Home</Button>

          </Link>
        </Space>
      </div>
    </div>
  );
};

export default NotFoundPage;
