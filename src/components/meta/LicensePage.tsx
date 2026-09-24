"use client";

import { useRef, useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export function LicensePage() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <div className="section">
          <div className="container-custom max-w-3xl" ref={containerRef}>
            <div
              className="text-center mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary" style={{ backgroundColor: "hsl(var(--primary)/10)" }}>
                  <Scale className="h-7 w-7" />
                </div>
                <h1 className="text-display-lg font-display font-bold text-foreground">License</h1>
              </div>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                GrokBot Society is licensed under the Apache License, Version 2.0 — a permissive, business-friendly license with patent grant.
              </p>
            </div>

            <div
              className="rounded-2xl border bg-card p-8"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
            >
              <div className="prose-custom max-w-none">
                <h2 className="font-display font-semibold text-heading-lg text-foreground mb-4">Apache License, Version 2.0</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Copyright 2026 GrokBot Society Contributors
                </p>

                <h3 className="font-semibold text-foreground mb-3">Summary</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6 list-disc list-inside">
                  <li>Permissive license — use, modify, distribute freely</li>
                  <li>Commercial use permitted</li>
                  <li>Patent grant included</li>
                  <li>No warranty or liability</li>
                  <li>License and copyright notice must be preserved</li>
                  <li>Modified files must carry prominent change notices</li>
                </ul>

                <h3 className="font-semibold text-foreground mb-3">Full License Text</h3>
                <div className="rounded-lg bg-muted p-6 overflow-x-auto text-sm font-mono text-muted-foreground whitespace-pre-wrap max-h-[600px] overflow-y-auto">
{`Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by
the copyright owner that is granting this License.

"Legal Entity" shall mean the union of the acting entity and all
other entities that control, are controlled by, or are under common
control with that entity. For the purposes of this definition,
"control" means (i) the power, direct or indirect, to cause the
direction or management of such entity, whether by contract or
otherwise, or (ii) ownership of fifty percent (50%) or more of the
outstanding shares, or (iii) the beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity
exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications,
including but not limited to software source code, documentation
source, and configuration files.

"Object" form shall mean any form resulting from mechanical
transformation or translation of a Source form, including but
not limited to compiled object code, generated documentation,
and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or
Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work
(an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object
form, that is based on (or derived from) the Work and for which the
editorial revisions, annotations, elaborations, or other modifications
represent, as a whole, an original work of authorship. For the purposes
of this License, Derivative Works shall not include works that remain
separable from, or do not incorporate, the Work, or works that are
merely distributed with the Work.

"Contribution" shall mean any work of authorship, including
the original version of the Work and any modifications or additions
to that Work or Derivative Works thereof, that is intentionally
submitted to Licensor for inclusion in the Work by the copyright owner
or by an individual or Legal Entity authorized to submit on behalf of
the copyright owner. For the purposes of this definition, "submitted"
means any form of electronic, verbal, or written communication sent
to the Licensor or its representatives, including but not limited to
communication on electronic mailing lists, bulletin boards, or similar
communication channels, but excluding communication that is clearly
marked as confidential or otherwise not intended for submission.

"Contributor" shall mean Licensor and any individual or Legal Entity
on behalf of whom a Contribution has been received by Licensor and
subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
copyright license to reproduce, prepare Derivative Works of,
publicly display, publicly perform, sublicense, and distribute the
Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
(except as stated in this License) patent license to make, have made,
use, offer to sell, sell, import, and otherwise dispose of the
Work, where such license applies only to those patent claims licensable
by such Contributor that are necessarily infringed by their
Contribution(s) alone or by combination of their Contribution(s)
with other Contributions.

4. Redistribution. You may reproduce and distribute copies of the
Work or Derivative Works thereof in Source or Object form, with or
without modifications, and in Source or Object form, provided that
You meet the following conditions:

(a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

(b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

(c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work,
    excluding those notices that do not pertain to the part of
    the Derivative Works that is derived from the Work, and

(d) If the Work includes a "NOTICE" text file as part of its
    distribution, then any Derivative Works that You distribute must
    include a readable copy of the NOTICE file, the text of which
    may be modified by You to be consistent with any changes You
    made to the Work. If the Work does not include a NOTICE text
    file, You need not include one.

5. Submission of Contributions. Unless You explicitly state otherwise,
any Contribution intentionally submitted for inclusion in the Work
by You to the Licensor shall be under the terms and conditions of
this License, without any additional terms or conditions.
Notwithstanding the above, nothing herein shall supersede or modify
the terms of any separate agreement between You and the Licensor
concerning such Contributions.

6. Trademarks. This License does not grant permission to use the trade
names, trademarks, service marks, or product names of the Licensor,
except as required for reasonable and customary use in describing the
origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
agreed to in writing, Licensor provides the Work (and each
Contributor provides its Contribution) on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied, including, without limitation, warranties or conditions
of MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, or
NON-INFRINGEMENT. You assume all risks and consequences associated
with the use of the Work.

8. Limitation of Liability. In no event and under no legal theory,
whether in tort (including negligence), contract, or otherwise,
shall any Contributor be liable to You for damages, including any
direct, indirect, special, incidental, or consequential damages
of any character arising as a result of this License or the use of
the Work (including but not limited to damages for loss of goodwill,
work stoppage, or computer system failure), unless required by
applicable law or agreed to in writing.

9. Accepting Warranty or Additional Liability. While redistributing
the Work or Derivative Works thereof, You may choose to accept,
and act on, any warranty or additional liability offered by another
party. However, in doing so, You act at Your own risk and
accept full responsibility for the consequences of such acceptance.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

To apply the Apache License to your work, attach the following
boilerplate notice, with the fields enclosed by brackets "[]"
replaced with your own identifying information. (Don't include
the brackets!) The text should be wrapped in the inference
step, not as a separate file. For example:

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

Copyright 2026 GrokBot Society Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.`}
                </div>

                <h3 className="font-semibold text-foreground mt-8 mb-3">Why Apache 2.0?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Permissive — minimal restrictions on use, modification, distribution</li>
                  <li>Patent grant — protects users and contributors from patent litigation</li>
                  <li>Business-friendly — suitable for commercial and open-source projects</li>
                  <li>Well-understood — widely adopted, legally vetted, compatible with other licenses</li>
                  <li>No copyleft — derivative works can use different licenses</li>
                </ul>

                <div className="mt-8 rounded-xl border bg-muted/30 p-6">
                  <h3 className="font-semibold text-foreground mb-3">Independent Project Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">GrokBot Society is an independent open-source project.</strong> It is not affiliated with, endorsed by, or connected to xAI, Grok, Cursor, or any other company. &quot;GrokBot&quot; in this project refers to an optional internal inference route name only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}