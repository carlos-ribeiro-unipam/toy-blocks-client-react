import React from "react";
import { shallow } from "enzyme";
import { Blocks } from "./Blocks";
import Block from "../components/Block";

describe("<Blocks />", () => {
  const actions = {
    getBlocks: jest.fn(),
  };

  const blocks = {
    loading: false,
    data: [
      {
        id: "1",
        description: 'Text for blocks actions test'
      },
      {
        id: "2",
        description: 'Text for blocks actions test. Alt'
      },
      {
        id: "3",
        description: 'Text for blocks actions test. Shift'
      }
    ],
  };

  it("should contain <Block />", () => {
    const wrapper = shallow(
      <Blocks
        actions={actions}
        blocks={blocks}
      />
    );

    expect(wrapper.find(Block).length).toEqual(3);
  });
});
