import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EventsPage from "./Pages/EventsPage";
import EventDetailPage from "./Pages/EventDetailPage";
import NewEventPage from "./Pages/NewEventPage";
import EditEventPage from "./Pages/EditEventPage";
import Layout from "./Pages/Layout";
import EventLayout from "./Pages/EventLayout";
//import { loader as eventLoader } from "./Pages/EventsPage";
import ErrorPage from "./Pages/ErrorPage";
import { loader as eventDetailLoader } from "./Pages/EventDetailPage";
import { action as ModifyEventAction } from "./components/EventForm";
import { action as DeleteEventAction } from "./Pages/EventDetailPage";
import NewsletterPage, { action as newsletterAction } from "./Pages/NewsLetter";
import AuthenticationPage, {
  action as AuthAction,
} from "./Pages/Authentication";
import { action as LogoutAction } from "./Pages/Logout";
import { loader as AuthLoader, AuthTokenLoader } from "./util/auth";
import { lazy } from "react";


//import HomePage from "./Pages/HomePage";
const HomePage = lazy(() => import('./Pages/HomePage'));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "auth",
      loader: AuthLoader,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: () => import('./Pages/EventsPage').then((module) => module.loader()),
            },
            {
              path: ":event_id",
              id: "event-detail",
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: DeleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  loader: AuthTokenLoader,
                  action: ModifyEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              loader: AuthTokenLoader,
              action: ModifyEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        { path: "auth", element: <AuthenticationPage />, action: AuthAction },
        { path: "logout", action: LogoutAction },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
