import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import toDoReducer from "./store/toDoSlice";
import { ToDo } from "./type";

// Функция для рендера с провайдерами (стором)
function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      tasks: toDoReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

let mockTodos: ToDo[] = [];

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    return key === "todos" ? JSON.stringify(mockTodos) : null;
  });

  vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
    if (key === "todos") {
      mockTodos = JSON.parse(value);
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Todo App", () => {
  it("should add a new todo", async () => {
    renderWithProviders(<App />);
    const input = screen.getByTestId("todo-input");
    const text = "New todo item";

    await userEvent.type(input, text);
    await userEvent.keyboard("{Enter}");

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should toggle todo completion", async () => {
    renderWithProviders(<App />);
    const input = screen.getByTestId("todo-input");
    await userEvent.type(input, "Test todo{Enter}");

    const toggleButton = screen.getByTestId("todo-toggle");
    await userEvent.click(toggleButton);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should delete a todo", async () => {
    renderWithProviders(<App />);
    const input = screen.getByTestId("todo-input");
    await userEvent.type(input, "Delete me{Enter}");

    const deleteButton = screen.getByTestId("todo-delete");
    await userEvent.click(deleteButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });

  it("should filter completed todos", async () => {
    renderWithProviders(<App />);
    const input = screen.getByTestId("todo-input");

    // Добавляем две задачи
    await userEvent.type(input, "Todo 1{Enter}");
    await userEvent.type(input, "Todo 2{Enter}");

    // Переключаем статус первой задачи
    const toggleButtons = screen.getAllByTestId("todo-toggle");
    await userEvent.click(toggleButtons[0]);

    // Фильтруем завершенные
    const completedFilter = screen.getByTestId("filter-completed");
    await userEvent.click(completedFilter);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Todo 2")).not.toBeInTheDocument();
  });

});
