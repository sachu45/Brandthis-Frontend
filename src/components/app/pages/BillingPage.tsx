import { useApp } from '../../../context/AppContext';
import { ExternalLinkIcon } from '../../icons';

export function BillingPage() {
  const { credits, activeProfile } = useApp();

  return (
    <section>
      <h1 className="page-title">Billing</h1>

      <div className="card">
        <div className="card-header">
          <h2>Current Plan</h2>
          <button className="btn-purple" style={{ padding: '9px 18px' }}>
            Upgrade
          </button>
        </div>
        <div className="card-body">
          <div className="plan-name">Free</div>
          <div className="stat-row">
            <div>
              <div className="stat-label">Credits ⓘ</div>
              <div className="stat-value">{credits}</div>
            </div>
            <div>
              <div className="stat-label">Top-up credits ⓘ</div>
              <div className="stat-value">9</div>
            </div>
            <div>
              <div className="stat-label">Price</div>
              <div className="stat-value">Free</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Billing &amp; Payment</h2>
          <button className="btn-manage">
            Manage <ExternalLinkIcon className="icon-sm" />
          </button>
        </div>
        <div className="card-body billing-cols">
          <div>
            <div className="stat-label">Name</div>
            <div className="stat-value">{activeProfile.name}</div>
          </div>
          <div>
            <div className="stat-label">Email</div>
            <div className="stat-value">{activeProfile.email}</div>
          </div>
          <div>
            <div className="stat-label">Country</div>
            <div className="stat-value">—</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Invoices</h2>
        </div>
        <div className="card-body">
          <div style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
            No invoices yet.
          </div>
        </div>
      </div>
    </section>
  );
}
