import AppRoutes from './routes/AppRoutes'

// Authentication is mounted once in main.jsx; keeping App focused on routing avoids nested providers.
export default function App() {
  return <AppRoutes />
}
