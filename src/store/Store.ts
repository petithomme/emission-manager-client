import { createStore } from "vuex";
import { ICompany } from "../interfaces/ICompany";
import axios from "axios";

export default createStore({
  state: {
    companies: [] as ICompany[],
    orderBy: "name",
    revert: false,
  },
  mutations: {
    updateCompanies(state, companies: ICompany[]) {
      state.companies = companies;
    },
    orderBy(state, type: String) {
      if (type === state.orderBy) {
        state.revert = !state.revert;
      } else {
        state.revert = false;
        state.orderBy = type;
      }
    },
  },
  actions: {
    addCompany(context, newCompany: ICompany) {
      axios
        .post("http://localhost:8080/companies", newCompany)
        .catch((error) => console.log(error))
        .then((answer) => {
          context.commit("updateCompanies", answer.data);
        });
    },
    deleteCompany(context, id: number) {
      axios
        .delete(`http://localhost:8080/companies/${id}`)
        .catch((error) => console.log(error))
        .then((answer) => {
          context.commit("updateCompanies", answer.data);
        });
    },
    getAllCompanies(context) {
      axios
        .get("http://localhost:8080/companies")
        .catch((error) => console.log(error))
        .then((answer) => {
          context.commit("updateCompanies", answer.data);
        });
    },
  },
  getters: {
    getCompaniesOrdered(state): ICompany[] {
      let result: ICompany[] = state.companies;

      if (state.orderBy === "name") {
        result = state.companies.sort((a: ICompany, b: ICompany) =>
          a.name.localeCompare(b.name),
        );
      }
      if (state.orderBy === "nace") {
        result = state.companies.sort((a: ICompany, b: ICompany) =>
          a.naceCode.localeCompare(b.naceCode),
        );
      }
      if (state.orderBy === "gva") {
        result = state.companies.sort(
          (a: ICompany, b: ICompany) => a.grossValueAdded - b.grossValueAdded,
        );
      }

      if (state.orderBy === "es1") {
        result = state.companies.sort(
          (a: ICompany, b: ICompany) => a.emissionScope1 - b.emissionScope1,
        );
      }
      if (state.orderBy === "es2") {
        result = state.companies.sort(
          (a: ICompany, b: ICompany) => a.emissionScope2 - b.emissionScope2,
        );
      }
      if (state.orderBy === "es3") {
        result = state.companies.sort(
          (a: ICompany, b: ICompany) => a.emissionScope3 - b.emissionScope3,
        );
      }
      return state.revert ? result.reverse() : result;
    },
  },
});
