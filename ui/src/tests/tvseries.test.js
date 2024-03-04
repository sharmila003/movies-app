/*import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import { Series } from '../Series';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BookmarkContext } from '../../App';


const server = setupServer(
    rest.get('https://entertainment-web-app-theta.vercel.app/bookmarked', (req, res, ctx) => {
        return res(ctx.json({
            bookmarkedResult: ['Undiscovered Cities']
        }));
    }),
    rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
        return res(ctx.status(200));
    })
)


var contextValue = {
    loggedIn: false,
    token: 'dkdiie838484jfjfuue4847',
    bookmarkedResult: 'Undiscovered Cities',
    setBookmarkedResult: jest.fn(),
};
const SeriesComponent = () => {
    return (
        <BrowserRouter>
            <BookmarkContext.Provider initialEntries={["/"]} value={contextValue} >
                <Series />
            </BookmarkContext.Provider>
        </BrowserRouter>

    )
}


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close());

describe('Series Component', () => {
    afterEach(() => server.resetHandlers())

    it('renders the series component', async () => {

        render(<SeriesComponent />);

        expect(screen.getByTestId('custom-element')).toHaveTextContent('Tv Series')
    });

    it('handles server errors', async () => {
        render(<SeriesComponent />);

        server.use(
            rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
                return res(ctx.status(201),
                    ctx.json({
                        errorMessage: 'Not authorized',
                    }),)
            }),
        )
        contextValue.bookmarkedResult = '';
        contextValue.loggedIn = false;

        const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
        fireEvent.click(bookmarkIcon);

        await waitFor(() => {
            expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-empty.svg');
        })
        expect(window.location.pathname).toBe("/login");

    });

    it('toggle bookmark when user clicks', async () => {

        render(<SeriesComponent />);
        const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
        contextValue.loggedIn = true;
        server.use(
            rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
                return res(ctx.status(201),
                    ctx.json({
                        bookmarked: 'Undiscovered',
                    }),)
            }),
        )

        contextValue.bookmarkedResult = ('Undiscovered Cities')

        fireEvent.click(bookmarkIcon);

        await waitFor(() => {

            expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-full.svg');

        })

    })

    it('returns the user search results', async () => {

        render(<SeriesComponent />);

        const searchInput = screen.getByPlaceholderText('Search for Movies or TV series'); // Replace with your actual placeholder text
        await (async () => {
            userEvent.type(searchInput, '112');
        });

        await waitFor(() => {
            expect(screen.getByTestId('search')).toBeInTheDocument()

        })
        await (async () => {
            await userEvent.clear(searchInput)

        });

    })

})*/


import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Tvseries from './Tvseries';
import axios from "axios";
// Mocking the BookmarkContext and its values
jest.mock('../App', () => ({
  BookmarkContext: {
    Consumer: ({ children }) =>
      children({
        loggedIn: true,
        token: 'mocked-token',
        bookmarkedResult: [],
        setBookmarkedResult: jest.fn(),
      }),
  },
}));

// Mocking axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  patch: jest.fn(() => Promise.resolve()),
}));

describe('Tvseries Component', () => {
  it('renders Tvseries component properly', async () => {
    render(<Tvseries />);
    
    // Assert that the search bar is rendered
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();

    // Assert that initial message is rendered
    expect(screen.getByText('Tv Series')).toBeInTheDocument();

    // Assert that axios.get is called to fetch bookmarked results
    expect(axios.get).toHaveBeenCalledWith('/bookmarked');

    // Mocking response data for data.json
    const responseData = [
      {
        title: 'Test Series 1',
        category: 'TV Series',
        thumbnail: {
          regular: {
            large: 'test-large-thumbnail-url',
            small: 'test-small-thumbnail-url',
          },
        },
        year: '2023',
        rating: '4.5',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: responseData });

    // Simulate typing into the search bar
    fireEvent.input(screen.getByTestId('searchbar'), { target: { value: 'Test Series' } });

    // Wait for the search results to be updated
    await waitFor(() => {
      expect(screen.getByText('Found 1 Result For \'Test Series\'')).toBeInTheDocument();
    });

    // Assert that the series element is rendered
    expect(screen.getByText('Test Series 1')).toBeInTheDocument();
  });
});
