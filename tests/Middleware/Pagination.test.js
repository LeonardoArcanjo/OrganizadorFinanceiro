import { describe, it, expect, vi } from "vitest";
import paginator from "../../src/Middleware/Pagination.js";
import ErrorRequest from "../../src/Errors/ErrorRequest.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

function createMockQuery(execResult) {
  const query = {};
  query.find = vi.fn().mockReturnValue(query);
  query.sort = vi.fn().mockReturnValue(query);
  query.skip = vi.fn().mockReturnValue(query);
  query.limit = vi.fn().mockReturnValue(query);
  query.exec = execResult instanceof Error
    ? vi.fn().mockRejectedValue(execResult)
    : vi.fn().mockResolvedValue(execResult);
  return query;
}

describe("paginator", () => {
  it("applies default range/page/sorting when query params are omitted", async () => {
    const items = [{ name: "Item 1" }];
    const query = createMockQuery(items);
    const res = createMockRes();
    const req = { query: {}, response: query };

    await paginator(req, res, createMockNext());

    expect(query.sort).toHaveBeenCalledWith({ _id: -1 });
    expect(query.skip).toHaveBeenCalledWith(0);
    expect(query.limit).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(items);
  });

  it("applies explicit range/page/sorting query params", async () => {
    const items = [{ name: "Item 1" }, { name: "Item 2" }];
    const query = createMockQuery(items);
    const res = createMockRes();
    const req = {
      query: { range: "10", page: "2", sorting: "value:1" },
      response: query,
    };

    await paginator(req, res, createMockNext());

    expect(query.sort).toHaveBeenCalledWith({ value: 1 });
    expect(query.skip).toHaveBeenCalledWith(10);
    expect(query.limit).toHaveBeenCalledWith(10);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(items);
  });

  it("calls next with an ErrorRequest when range is not positive", async () => {
    const query = createMockQuery([]);
    const res = createMockRes();
    const next = createMockNext();
    const req = { query: { range: "0" }, response: query };

    await paginator(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorRequest);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("calls next with an ErrorRequest when page is not positive", async () => {
    const query = createMockQuery([]);
    const res = createMockRes();
    const next = createMockNext();
    const req = { query: { page: "-1" }, response: query };

    await paginator(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorRequest);
  });

  it("calls next with the error when the query execution rejects", async () => {
    const failure = new Error("db exploded");
    const query = createMockQuery(failure);
    const res = createMockRes();
    const next = createMockNext();
    const req = { query: {}, response: query };

    await paginator(req, res, next);

    expect(next).toHaveBeenCalledWith(failure);
    expect(res.status).not.toHaveBeenCalled();
  });
});
