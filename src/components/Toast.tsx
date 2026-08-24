import { useApp } from '../context/AppContext';

/** Single transient message pinned to the bottom of the viewport. */
export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="brand-toast" role="status">
      {toast}
    </div>
  );
}
