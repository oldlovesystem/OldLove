import React from 'react';
import Image from 'next/image';
import { RiLoopRightLine } from 'react-icons/ri';
import { MdLockOutline } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';

interface Props {
  props: string;
}

const Benefit: React.FC<Props> = ({ props }) => {
  return (
    <>
      <div className="font-tenor-sans container flex items-center justify-center">
        <div className={`benefit-block ${props}`}>
          <div className="list-benefit grid grid-cols-1 items-center justify-center gap-[30px] text-center lg:grid-cols-3">
            <div className="benefit-item flex flex-col items-center justify-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtElEQVR4nO1ZbWhXVRj/7b/csjEFcbpBX0pTY4lMBpIvfdlYLxRufihh4QaGL1B+iIl+y0zBqd9XMYJGH0JIDeqTIJVa+AIihS2lQEud2AvhrL3kbjzxO/F0du65597//f/ZYj84cM85z/Oc53fvOc8557lAadEB4BsWeZ52WAXgcwCRVc4CeArTAEsBHFWODwHYzjKk2o9SdsphPoADAEbp6DDrc5RMDYBdAH6nzDiAdwA0YAqgJoNzIaTLhgcAbAFwS02XEwCWp7CxBMARABPUv8OXUoUyoQ3AoCJwBsCaIuytoQ1jb5BjlBzDatDXcrQrtozduygDdDgd5nSoLMJeBaepWWemZMLzAM7TsXMAnvPImoGOWdOrMcO4jda0OhZAJNbXZ9SCM2WCCj4ighcAXGd9jNGnOoDALH7JEepK0NjksG/D6+uXbNjFcLpbveUkIoK5APrUAN8CWOchsY4yxok+2oizr+H1dYwVE/aq1BsOIWKwFsBl5eDbloNz2WYIX6ZOqP1EX12KPmO+PplWe9RmdwPABpYbbBulTNwUjFKO/W9bnkQMHgNw0nFoDAkK0VQiIijwsGjkt7MN041IKeSjGSL/5y8yyr79Ocx5DbG1X0W2khPZynuH9H8MoDYHIrW0FdH2lnIQMbvzbcp8l3BtTbK1CMDXlPkFQGtKW0FELgD4AMBqh9FHLQdaMhBpoW7ETMsih8xa+nAhLZFXHBuZfO6umClxXMnsSEFkR8AU7VIyumxOIvIQLzVSfwNAE4CDrN8H0B2zSN9SZ6h+6/hhE6mmTESdfTFBo5tjilwvfdnDutxdZvuIPMnnryyjOxPICF4EcI9ypwEsdBBZyL6Isi/F2OpWJGRsjbNsX+Uj0qTmayEDGdG/Rjm5p6xU9lequ8t1yiaR6LH6CuqEvcIm8hcfKnnhMZmRQ45BQsgsAHBKvXUzkOtrpSEB+iR9N+lrJevCAT+zMk/dwsbU3MxCRu4J7zoWab8n3ZNEopd94tvTbJvHNuGAq6zovaBd7eAuMj0BZASvMurERbS0JEbpm8Eytl+RyoesbLOU8yLT5FkPxZCAuiYIh38ih1R+AlCH7GQ6kR6dRZCoo8+RiX4F9QvgPC/1WciMxJwAfBnGkYwkauir9H+mI2y9WisfMWmWhozZNIeYpE5CnTqr9aYkUUEfI/o8KQLKYv+VAnsdxjUZyV9pyBv5lH1CKgmHKfuJY7864CEB+ib9v/kOq22MMBMxu+56RcYeZCl17znWmr3P/EFZSVJodCgSMpaNjfRtPCTRbZLJMlizo1+yel/EZEOOUPdlj/1NOtJYaKRtV5azmT5FCaH8P+hTO+jDoUq8EIneex6Z9x0n2CQ0APgxwPYkzGI0iHhIezBQbzl1LnpkLlHmiUCbs5msNhFKfEsFiT7f08BAoE69OhTGwbzZuPOWjQHK/xAYEZ14XP23eD1Avlqtrzj8SZmQrH0PZe+m/K3nRDt3XzlhPhsgH3cjDO03aFURVO46ueBNDi77zOIyEHmEP0cj3gpzQ0H9TZKFV2oi5yhzPDB3lgq1gU7kQSRiScqZZUa5iZQMM0QUZr5InpDsiBzqipHJw8Yk/A1Br6BvF+HWcAAAAABJRU5ErkJggg=="
                alt="handle-with-care"
              />

              <div className="heading6 mt-5 text-center">Fast Shipping & Easy Returns</div>
              <div className="caption1 text-secondary mt-3 text-center">
                Shop with Confidence: Your Payment Information is Safe
              </div>
            </div>

            <div className="benefit-item flex flex-col items-center justify-center">
              <Image
                width={50}
                height={50}
                src="data:image/png;base64,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"
                alt="security-checked--v1"
              />
              <div className="heading6 mt-5 text-center">Our Guarantee</div>
              <div className="caption1 text-secondary mt-3 text-center">
                Shop with Confidence: Your Payment Information is Safe
              </div>
            </div>

            <div className="benefit-item flex flex-col items-center justify-center">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD+klEQVR4nO2Zb2jVVRjHP9NtMfNPagvJEBVNp8bINwsbgr2ofKP4RkRCxUAMChN0glJk/7YonBL6QlOaCAq+ELG0fGEqWobCpL3QUWTUVByyLG1WW/vFI98fHH787u69u+fsXmRfOHDuvec8z/me
P895zvfCEB5uTANeBT4DzgC/Al1AL/ADUE0J41HgDaAViLKUkiQzDFgL3HYG+jdw
EtgKLARqgCeACSJhbXqADuB74CCwGphYLBITgFMOgavAm8Dj/fSpdsiklWPA3ME
+B7/I+V9AA1CRR39rO16DXgEcAO7KXh+wK097A8KTOsDm9DIwxZPd0cBbmhizfR
oYSyCUA9/J0bfAqAA+ZgPX5OMrnUPv2CgHPwPjCIfpQKd8vePb+EhFp/+A5wiP+T
ov931HtAbN0OcMHg7J53ZfBst0wG01ZhZoy8LzJeAcMCJL21ki8idQiQfUyqA5LwRT
gTbn3tiTQ59WtV2AB2yWMTvsA8EjwCbNrNn5Bril+vtZ+m5VuyY84KiM1efZbwzwOv
CTc9nZgIYD85w7Yx9QlcHGIrX50gOPBxefGXssh7YWlpfpto4HGt879SmRqUu/XwF
eyJBFxMlmwfgduJcSjmcALynz3SvCvc7grX5cs2oBIw2TgQtOn9OyOczxY9/f8UHED
N10Pp/oJ/GzuP+1EsincrRfoTMUr05MyPUfhSASG7Yw+gXQDKwCni0wTNq23JAy8
OBEQiEaIlLCK3LS+XwdaCxk+xaTSJRSPhyI0SrnJbhYYXSwiJQnfD3vrEzeeC8xG2
6uFAqRyo8+D34sFuzUTLikQiFKKcnf8kYsClQp+VsDtEt8C4WzUmVW+iTymzpaKlE
MRL6IHFbH3f3kSyEROQOvV93EvbwxB/hXBs5KsrEtFhpjgbcznJcPBmr0ZeAPx9AS
wmN9CoEOkagsVECLX2uW3YZEmQJKHC29R8lyzYq99J4mHF50RIeJqtuO8Ip4VT
4hHI7Ixw6gzrmIvWu//2i2QqiNMyU79aneLCLbAvh68KyNtDq+0eKsxmy9OHtV944az
VqXlJJMsOjyEXDDObCd+s7OWxL2h9B+RUlXzP6UgIhnzpY+E5r6edvbuyIJExrqZP
O+2p3ypTJmwiQ569GlmYY4yTQNi0Qqnq30aiWCkojxrpyez7BVYiI2eBJpRlqxBLVN
BzvImciESke8S5M0G/PcWkVFrf7J7ZPCmCTamHjHdDqyKYpOkURAE/yKiqWKYj2q
55qGNDnnwSJVSWCdBmWEPs6SIVdL2Iu0kq9RYlgujTjSHbBFW2+UBj9PW+mO2
nQDr1CieAa4mEN4Pae2JY0y7fkW/TfSLTmpXemNl3+fhkCJ43+lyJ+bKcIMkAAAAA
BJRU5ErkJggg=="
                alt="online-support--v1"
              />
              <div className="heading6 text-center mt-5">Dedicated Customer Support</div>
              <div className="caption1 text-secondary mt-3 text-center">
                We're Here to Assist You In Every Step of the Way.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefit;
