import { useParams } from 'react-router-dom';

export default function Project() {
  const { slug } = useParams();
  return <div className="p-8">Project: {slug}</div>;
}
