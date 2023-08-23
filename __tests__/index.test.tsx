import "@testing-library/jest-dom"
import { getByTestId, render, screen } from "@testing-library/react"
import axios from "axios"
import * as ReactQuery from "@tanstack/react-query"
import Index from "src/pages/index"
import { act } from "react-dom/test-utils"
jest.mock("swiper/css", () => jest.fn())
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
describe("Main Page render components", () => {
    const queryClient = new ReactQuery.QueryClient()
    const hotels = [
        {
            name: "Hotel 1",
            email: "testmail1@mail.com",
            phone: "3216541223",
            department: "Valle del cauca",
            city: "cali",
            address: "address",
            state: "enabled",
            image_url: "image_url",
            rooms: [
                {
                    hotel_id: "hotel_id1",
                    cost: "100000",
                    tax: "50000",
                    type: "type room",
                    location: "Location room",
                    state: "enabled",
                    file: "",
                    image_url: "image_url",
                },
            ],
        },
        {
            name: "Hotel 2",
            email: "testmail2@mail.com",
            phone: "3214567854",
            department: "Valle del cauca",
            city: "cali",
            address: "address",
            state: "enabled",
            image_url: "image_url",
            rooms: [
                {
                    hotel_id: "hotel_id2",
                    cost: "105000",
                    tax: "51000",
                    type: "type room",
                    location: "Location room",
                    state: "enabled",
                    file: "",
                    image_url: "image_url",
                },
            ],
        },
    ]
   
    it("List of hotels rendered", async () => {
        jest.spyOn(ReactQuery, "useQuery").mockImplementation(
            jest.fn().mockReturnValue({
                data: [...hotels],
                isFetching: false,
            })
        )
        act(() => {
            return render(
                <ReactQuery.QueryClientProvider client={queryClient}>
                    <Index />
                </ReactQuery.QueryClientProvider>
            )
        })
        const swiperElement = screen.getAllByTestId(
            "swiper-hotels-main-list-item"
        )
        expect(hotels.length === swiperElement.length).toBe(true)
    })
    it("Swipe carousel render correct values", () => {
        jest.spyOn(ReactQuery, "useQuery").mockImplementation(
            jest.fn().mockReturnValue({
                data: [...hotels],
                isFetching: false,
            })
        )
        act(() => {
            return render(
                <ReactQuery.QueryClientProvider client={queryClient}>
                    <Index />
                </ReactQuery.QueryClientProvider>
            )
        })
       
        const swiperElement = screen.getAllByTestId(
            "swiper-hotels-main-list-item"
        )
        swiperElement.forEach((element, i) => {
            const textTitle = element.querySelector(
                "div[data-pc-section=title]"
            )?.textContent
            expect(hotels[i].name === textTitle).toBe(true)
            const textSubtitle = element.querySelector(
                "div[data-pc-section=subtitle]"
            )?.textContent
            expect(hotels[i].city === textSubtitle).toBe(true)
            const textContent = element.querySelector(
                "div[data-pc-section=content]"
            )?.textContent
            expect(
                `${hotels[i].rooms.length} Habitaciones disponibles` ===
                    textContent
            )
        })
    })

    it("No available items message rendered", () => {
        jest.spyOn(ReactQuery, "useQuery").mockImplementation(
            jest.fn().mockReturnValue({
                data: undefined,
                isFetching: false,
            })
        )
        act(() => {
            return render(
                <ReactQuery.QueryClientProvider client={queryClient}>
                    <Index />
                </ReactQuery.QueryClientProvider>
            )
        })
        const swiperElement = screen.getByTestId(
            "message-no-availability-carousel"
        )
        expect(swiperElement.textContent==="No hay hoteles disponibles")
    })
})
