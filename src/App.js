import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import EventDetailPage from "./Pages/EventDetailPage";
import NewEventPage from "./Pages/NewEventPage";
import EditEventPage from "./Pages/EditEventPage";
import Layout from "./Pages/Layout";
import EventLayout from "./Pages/EventLayout";
import { loader as eventLoader } from "./Pages/EventsPage";
import ErrorPage from "./Pages/ErrorPage";
import { loader as eventDetailLoader } from "./Pages/EventDetailPage";
import { action as ModifyEventAction } from "./components/EventForm";
import { action as DeleteEventAction } from "./Pages/EventDetailPage";
import NewsletterPage, { action as newsletterAction } from "./Pages/NewsLetter";
import AuthenticationPage from "./Pages/Authentication";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
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
              loader: eventLoader,
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
                  action: ModifyEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: ModifyEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        { path:"/auth", element: <AuthenticationPage />}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
