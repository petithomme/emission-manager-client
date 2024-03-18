import { mount } from "@vue/test-utils";
import AddCompanyComponent from "../../src/components/AddCompanyComponent.vue";
import { expect, test } from "vitest";
const wrapper = mount(AddCompanyComponent);

test("testing add company component", async () => {
  expect(typeof AddCompanyComponent.methods.onAddClicked).toBe("function");
  expect(typeof AddCompanyComponent.methods.validateInput).toBe("function");
  expect(typeof AddCompanyComponent.methods.onCloseClick).toBe("function");
  expect(typeof AddCompanyComponent.methods.onAddCompanyClicked).toBe(
    "function",
  );
  expect(typeof AddCompanyComponent.methods.clearData).toBe("function");

  (wrapper.vm as any).validateInput();
  expect((wrapper.vm as any).error).toBe("Please fill all values");

  (wrapper.vm as any).name = "test";
  (wrapper.vm as any).naceCode = "A1.22";
  (wrapper.vm as any).grossValueAdded = 12234.0;
  (wrapper.vm as any).emissionScope1 = 23.5;
  (wrapper.vm as any).emissionScope2 = 32;
  (wrapper.vm as any).emissionScope3 = -2;

  (wrapper.vm as any).validateInput();

  expect((wrapper.vm as any).error).toBe(
    "Please your inputs, scopes and GVA must be positive",
  );

  (wrapper.vm as any).emissionScope2 = "asd";
  (wrapper.vm as any).emissionScope3 = 5;

  (wrapper.vm as any).validateInput();

  expect((wrapper.vm as any).error).toBe(
    "Please your inputs, scopes and GVA must be numbers",
  );

  (wrapper.vm as any).emissionScope2 = 14;
  (wrapper.vm as any).naceCode = "Z1.22";
  (wrapper.vm as any).validateInput();

  expect((wrapper.vm as any).error).toBe("Please check your nace code");

  (wrapper.vm as any).naceCode = "A113.22";
  (wrapper.vm as any).validateInput();

  expect((wrapper.vm as any).error).toBe("Please check your nace code");

  (wrapper.vm as any).naceCode = "A11.22.3.34";
  (wrapper.vm as any).validateInput();

  expect((wrapper.vm as any).error).toBe("Please check your nace code");
});
