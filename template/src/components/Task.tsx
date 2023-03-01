
import React from 'react';

// @ts-ignore
export default function Task({ task, onArchiveTask, onPinTask }: any) {
  return (
    <div className="list-item">
      <label htmlFor="title" aria-label={task.title}>
        <input type="text" value={task.title} readOnly={true} name="title" />
      </label>
    </div>
  );
}
