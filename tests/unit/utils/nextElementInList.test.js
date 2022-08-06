import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("when element is on the end of the list", () => {
    it("locates next element at the start of the list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });
});
