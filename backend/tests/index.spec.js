import axios from "axios";
import assert from "assert";

describe("Testing server", () => {
  it("Accessing root url should return 200", async () => {
    const res = await axios.get("http://127.0.0.1:8000");
    assert.equal(200, res.status);
  });

  it("Accessing emissions endpoint should return 200", async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/countries/all/emissions"
    );
    assert.equal(200, res.status);
  });
});
