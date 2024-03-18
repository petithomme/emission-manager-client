import { expect, test } from "vitest";
import store from "../store/Store";
import { ICompany } from "../interfaces/ICompany";

const c1: ICompany = {
  name: "company1",
  naceCode: "A1.22",
  grossValueAdded: 12234.0,
  emissionScope1: 23.5,
  emissionScope2: 32,
  emissionScope3: 126,
};
const c2: ICompany = {
  name: "company2",
  naceCode: "A2.1",
  grossValueAdded: 765.0,
  emissionScope1: 1.23,
  emissionScope2: 67,
  emissionScope3: 987,
};
const c3: ICompany = {
  name: "company3",
  naceCode: "B3.12",
  grossValueAdded: 34,
  emissionScope1: 14.7,
  emissionScope2: 14.7,
  emissionScope3: 0,
};
const c4: ICompany = {
  name: "company4",
  naceCode: "E12.4",
  grossValueAdded: 123,
  emissionScope1: 52.1,
  emissionScope2: 4,
  emissionScope3: 732,
};
const c5: ICompany = {
  name: "company5",
  naceCode: "F.1",
  grossValueAdded: 78.4,
  emissionScope1: 1.24,
  emissionScope2: 27,
  emissionScope3: 3,
};

test("Check mutation for companies", () => {
  // check default
  expect(store.state.companies).toEqual([]);

  store.commit("updateCompanies", [c1, c2, c3, c4, c5]);
  expect(store.state.companies).toEqual([c1, c2, c3, c4, c5]);
});

test("Check ordering for companies", () => {
  store.commit("orderBy", "name");
  expect(store.getters.getCompaniesOrdered).toEqual([c5, c4, c3, c2, c1]);
  store.commit("orderBy", "nace");
  expect(store.getters.getCompaniesOrdered).toEqual([c1, c2, c3, c4, c5]);
  store.commit("orderBy", "gva");
  expect(store.getters.getCompaniesOrdered).toEqual([c3, c5, c4, c2, c1]);
  store.commit("orderBy", "es1");
  expect(store.getters.getCompaniesOrdered).toEqual([c2, c5, c3, c1, c4]);
  store.commit("orderBy", "es2");
  expect(store.getters.getCompaniesOrdered).toEqual([c4, c3, c5, c1, c2]);
  store.commit("orderBy", "es3");
  expect(store.getters.getCompaniesOrdered).toEqual([c3, c5, c1, c4, c2]);
});

test("Check reverse ordering for companies", () => {
  store.commit("orderBy", "name");
  store.commit("orderBy", "name");
  expect(store.getters.getCompaniesOrdered).toEqual([c5, c4, c3, c2, c1]);

  store.commit("orderBy", "nace");
  store.commit("orderBy", "nace");
  expect(store.getters.getCompaniesOrdered).toEqual([c5, c4, c3, c2, c1]);

  store.commit("orderBy", "gva");
  store.commit("orderBy", "gva");
  expect(store.getters.getCompaniesOrdered).toEqual([c1, c2, c4, c5, c3]);

  store.commit("orderBy", "es1");
  store.commit("orderBy", "es1");
  expect(store.getters.getCompaniesOrdered).toEqual([c4, c1, c3, c5, c2]);

  store.commit("orderBy", "es2");
  store.commit("orderBy", "es2");
  expect(store.getters.getCompaniesOrdered).toEqual([c2, c1, c5, c3, c4]);

  store.commit("orderBy", "es3");
  store.commit("orderBy", "es3");
  expect(store.getters.getCompaniesOrdered).toEqual([c2, c4, c1, c5, c3]);
});
