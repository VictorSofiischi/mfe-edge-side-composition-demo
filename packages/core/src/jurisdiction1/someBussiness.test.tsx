import { describe, it, vi, expect } from "vitest";
import React from "react";
import axios from "axios";
import { fetchSomeBussiness } from ".";

vi.mock('axios');

describe("someBussiness", () => {
  it("get correct data from api", async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: "Test todo",
      completed: false,
    };

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: mockData,
    } as any);

    const result = await fetchSomeBussiness();

    expect(result).toEqual(mockData);

    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
  });
});
