import React, { useState, useCallback } from "react";

import type { JsonGroup, Config, ImmutableTree, BuilderProps } from '@react-awesome-query-builder/ui';
import { Utils as QbUtils, Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';
import '@react-awesome-query-builder/ui/css/styles.css';
const InitialConfig = BasicConfig;

const config: Config = {
  ...InitialConfig,
  fields: {
    reading: {
      label: "Reading",
      type: "number",
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    }
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const QueryBuilder: React.FC<{ onConditionChange: (condition: string) => void }> = ({ onConditionChange }) => {
  const [state, setState] = useState({
    tree: QbUtils.loadTree(queryValue),
    config: config
  });

  const onChange = useCallback((immutableTree: ImmutableTree, config: Config) => {
    setState(prevState => ({ ...prevState, tree: immutableTree, config }));

    const queryString = QbUtils.queryString(immutableTree, config);
    console.log(queryString); // This will show the generated condition

    // Call the onConditionChange with the generated query string
    onConditionChange(queryString || '');
  }, [onConditionChange]);

  const renderBuilder = useCallback((props: BuilderProps) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  ), []);

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        <div>
          Threshold Setting:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;