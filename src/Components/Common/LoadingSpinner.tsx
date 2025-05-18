import './LoadingSpinner.css'; // Create this CSS file

interface LoadingSpinnerProps {
  small?: boolean;
}

const LoadingSpinner = ({ small = false }: LoadingSpinnerProps) => {
  return (
    <div className={`spinner-container ${small ? 'small' : ''}`} aria-label="Loading">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;