import React from "react";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  MoneyCollectOutlined,
  SmileOutlined
} from "@ant-design/icons";

export default function StepsComponent({
  login = "finish",
  verification = "wait",
  pay = "wait",
  done = "wait"
}) {
  const { Step } = Steps;
  return (
    <div>
      <Steps>
        <Step status={login} title="Login" icon={<UserOutlined />} />
        <Step
          status={verification}
          title="Verification"
          icon={<SolutionOutlined />}
        />
        <Step status={pay} title="Pay" icon={<MoneyCollectOutlined />} />
        <Step status={done} title="Done" icon={<SmileOutlined />} />
      </Steps>
    </div>
  );
}
