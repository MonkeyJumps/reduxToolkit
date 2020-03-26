import { addBug, resolveBug, getUnresolvedBugs } from '../bugs';
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
    const bugsSlice = () => store.getState().entities.bugs;
    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    });
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



    describe("selectors ", () => {

        it("getUnresolvedBugs", () => {
            //AAA
            //Arrange
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true },{ id: 2 },{ id: 3 }];
            //Act
            const result = getUnresolvedBugs(state);
            ///Assert
            expect(result).toHaveLength(2);
        })



    })



})