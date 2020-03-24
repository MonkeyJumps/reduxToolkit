import { addBug } from '../bugs';
import { apiCallBegan } from '../api';
import configureStore from '../configureStore';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';


describe("bugsSlice", () => {

    let fakeAxios;
    let store;
    beforeEach(() => {

        fakeAxios = new MockAdapter(axios);
        store = configureStore();

    })

    const bugsSlice = ()=> store.getState().entities.bugs;

    describe("action creators", () => {


        it("should add bug to store if saved on server", async () => {


            //Arrange
            const bug = { describe: "a" };
            const savedBug = { ...bug, id: 1 };
            
            fakeAxios.onPost('/bugs').reply(200, savedBug);
            
            //Act
            await store.dispatch(addBug(bug));
            //Assert            
            expect(bugsSlice().list).toContainEqual(savedBug);

        })

    })
    describe("action creators", () => {


        it("should not add bug to store if saved on server", async () => {


            //Arrange
            const bug = { describe: "a" };
            const savedBug = { ...bug, id: 1 };
            
            fakeAxios.onPost('/bugs').reply(500, savedBug);
            
            //Act
            await store.dispatch(addBug(bug));
            //Assert            
            expect(bugsSlice().list).toHaveLength(0);

        })

    })
})