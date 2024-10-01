import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      {' '}
      NOT FOUND PAGE
      <p>
        Please visit our <Link to="/">home page</Link>
      </p>
    </div>
  );
}
