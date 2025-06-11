import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Code,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@newsware/ui'

export function QueryLanguageTutorial() {
  return (
    <div className="grid gap-6">
      <Tabs defaultValue="literals">
        <TabsList>
          <TabsTrigger value="literals">Literals</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="conditionals">Conditionals</TabsTrigger>
        </TabsList>
        <TabsContent value="literals">
          <Section className="mt-4">
            <div>
              The easiest possible search is a word or phrase enclosed in double quotes. All literal
              searches are case insensitive.
            </div>
            <div>
              This example will search for the phrase “buys Bitcoin” in both headline and body of
              the news record.
            </div>
            <Code>"buys Bitcoin"</Code>
            <div>
              By adding /h or /b to the end of the literal we can search only in headline or body.
            </div>
            <div>This example will search the phrase only in the headline of the news:</div>
            <Code>"buys Bitcoin"/h</Code>
            <div>This example will search the phrase only in the body of the news:</div>
            <Code>"buys Bitcoin"/b</Code>
          </Section>
        </TabsContent>
        <TabsContent value="metadata">
          <Section>
            <div>
              News records can also be filtered by metadata, all metadata is case-insensitive. The
              available metadata is:
            </div>
            <ul className="list-disc pl-5">
              <li>Ticker</li>
              <li>Source (s)</li>
              <li>Category, Industry, and Region codes (c)</li>
            </ul>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="ticker">
                  <AccordionTrigger>
                    <SectionTitle className="!text-base">Ticker</SectionTitle>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section>
                      <div>
                        Each news record has company tickers associated, they can be used to find
                        records for specific companies.
                      </div>
                      <div>
                        This example will retrieve records that have the Apple (AAPL) ticker:
                      </div>
                      <Code>aapl</Code>
                    </Section>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="source">
                  <AccordionTrigger>
                    <SectionTitle className="!text-base">Source</SectionTitle>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section>
                      <div>
                        Each news record comes from a source, it is possible to retrieve records
                        from a specific source. The available sources can be consulted here:
                      </div>
                      <div>
                        <Button variant="link">
                          <a href="https://docs.newsware.com/sources">
                            https://docs.newsware.com/sources
                          </a>
                        </Button>
                      </div>
                      <div>
                        This example will search records that come from the Dow Jones (dj) source:
                      </div>
                      <Code>s/dj</Code>
                    </Section>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="codes">
                  <AccordionTrigger>
                    <SectionTitle className="!text-base">Codes</SectionTitle>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section>
                      <div>
                        Codes are assigned by news sources to each record. They help identify the
                        type of content of the record.
                      </div>
                      <div>
                        <Section>
                          <SectionTitle className="text-2xl">Curated codes</SectionTitle>
                          <div>
                            Since each news source uses its own codes, the Newsware team has created
                            curated codes. They encompass codes from all sources related to the same
                            topic, and can be consulted here:
                          </div>
                          <div>
                            <Button variant="link">
                              <a href="https://docs.newsware.com/codes">
                                https://docs.newsware.com/codes
                              </a>
                            </Button>
                          </div>
                          <div>
                            This example retrieves records across all sources that have an
                            “earnings” related code:
                          </div>
                          <Code>c/earnings</Code>
                        </Section>
                        <Section>
                          <SectionTitle className="text-2xl">Source codes</SectionTitle>
                          <div>
                            Codes assigned directly by the sources can also be used to filter
                            records. Source codes can be consulted here, in the corresponding
                            section for each source:
                          </div>
                          <div>
                            <Button variant="link">
                              <a href="https://docs.newsware.com/codes">
                                https://docs.newsware.com/codes
                              </a>
                            </Button>
                          </div>
                          <div>
                            This example retrieves the FDA code used by source PR Newswires (pn):
                          </div>
                          <Code>c/pn.fda</Code>
                        </Section>
                      </div>
                    </Section>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="conditionals">
          <Section>
            <div>Multiple filters can be used joined by the conditionals:</div>
            <ul className="list-disc pl-5">
              <li>
                And (<span className="font-bold">&</span>)
              </li>
              <li>
                Or (<span className="font-bold">|</span>)
              </li>
              <li>
                Not (<span className="font-bold">!</span>)
              </li>
            </ul>
            <div>This example will retrieve records that fulfill ALL of the following:</div>
            <ul className="list-disc pl-5">
              <li>Mention “risk profile” in the headline.</li>
              <div>AND</div>
              <li>Have the ticker for Texas Instruments (TXN).</li>
              <div>AND NOT</div>
              <li>From the SEC source.</li>
            </ul>
            <Code>"risk profile"/h & txn & !s/sec</Code>

            <div>This example will retrieve records that fulfill ALL of the following:</div>
            <ul className="list-disc pl-5">
              <li>Mention “Texas Instruments” in the headline OR have ticker “TXN”.</li>
              <div>AND</div>
              <li>Are from the source Fly on the Wall (fly_on_the_wall).</li>
            </ul>
            <Code>("Texas Instruments"/h | txn) & s/fly_on_the_wall</Code>

            <div>
              Remember that “and” conditions have precedence over “or” conditions, they are resolved
              first. This example will retrieve news that fulfill ONE OF the following:
            </div>
            <ul className="list-disc pl-5">
              <li>Have ticker “BTC”.</li>
              <div>OR</div>
              <li>Mention “Bitcoin” AND “crypto”.</li>
            </ul>
            <Code>btc | "Bitcoin" & "crypto"</Code>

            <div>This example will retrieve news that fulfill ONE OF the following:</div>
            <ul className="list-disc pl-5">
              <li>Mention “Bitcoin” AND NOT “scam”.</li>
              <div>OR</div>
              <li>Have ticker “BTC”.</li>
            </ul>
            <Code>"Bitcoin" & !scam | btc</Code>

            <div>This example will retrieve news that fulfill ALL of the following:</div>
            <ul className="list-disc pl-5">
              <li>Have ticker “BTC”.</li>
              <div>AND NOT</div>
              <li>Mention “scam” nor “NFT”</li>
            </ul>
            <Code>btc & (!scam & !nft)</Code>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={'grid gap-1 text-md ' + className}>{children}</div>
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={'text-xl font-bold mb-2 ' + className}>{children}</div>
}
